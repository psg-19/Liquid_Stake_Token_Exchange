import { createBurnInstruction, getOrCreateAssociatedTokenAccount, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token"
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, SendTransactionError, SystemProgram, Transaction } from "@solana/web3.js"
import bs58 from 'bs58'
// import { getNativeSolAmount } from "./utils.jsx"

 



export async function getSplTokenBalances(solAmt,psolAmt) {
  const connection = new Connection("https://api.devnet.solana.com");
  const publicKey = new PublicKey("AkJwrYJtXMyWCFksYr9ist8L2iuUgbZDmu4kpMwf3aLf");

  let sol = await connection.getBalance(publicKey);
  const mintPublicKey = new PublicKey("926TKECn5TFmncbYwjNbKtMcbQPYXn7foBbw147oemBj");
  let psol = await connection.getTokenSupply(mintPublicKey);
  psol=psol.value.amount
  //  psol-=psolAmt
   sol-=solAmt
console.log(psol,sol)
  return { psol, sol };
}


export const getMintAmount=async(sol_credited)=>{

  // constant product algo :)
  let {psol,sol}=await getSplTokenBalances(sol_credited,0);
  
sol=sol/1e9
psol=psol/1e9

sol_credited/=1e9

const k=psol*(sol);

sol+=sol_credited;

const new_psol=k/sol;
// console.log(psol-new_psol)
return ( psol-new_psol)*1e9;


}


export const getNativeSolAmount=async(psol_credited)=>{

  // constant product algo :)
  let {psol,sol}=await getSplTokenBalances(0,psol_credited);
sol=sol/1e9
psol=psol/1e9;
const k=psol*(sol);


psol_credited/=1e9
psol-=psol_credited

const new_sol=k/psol;
console.log(sol-new_sol)
return (new_sol-sol)*1e9;


}







export const burn_And_Send_Native_Token = async(fromAddress,amount) => {
  
  let x =await getNativeSolAmount(amount)
  
  
  console.log("burn it fukker  "+amount);
  x= Math.floor(x)
  console.log("hhiii "+x);
//   return
    const dest=new PublicKey(fromAddress);
const payer=  Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY  ))
const mintAdress=new PublicKey("926TKECn5TFmncbYwjNbKtMcbQPYXn7foBbw147oemBj")
// console.log(payer)

const connection=new Connection("https://api.devnet.solana.com")



const payerPDA=await getOrCreateAssociatedTokenAccount(
   connection,
  payer,
  mintAdress,
  payer.publicKey, 
  true,
  "confirmed",
  undefined,
  TOKEN_2022_PROGRAM_ID
) 
 

const transaction=new Transaction()
.add(
    
    createBurnInstruction( payerPDA.address,mintAdress,payer.publicKey,amount,[],TOKEN_2022_PROGRAM_ID)
     
)
.add(

    // console.log("tmkc11111")
    SystemProgram.transfer(
        {
            
            fromPubkey: payer.publicKey,
            
            toPubkey: dest,
            
            lamports: x,
        }
    )
) 



try {
    await sendAndConfirmTransaction(connection, transaction, [payer]);
} catch (error) {
    if (error instanceof SendTransactionError) {
        const logs = await error.getLogs();
        console.error("Transaction failed with logs:", logs);
    } else {
        console.error("An unexpected error occurred:", error);
    }
}

}