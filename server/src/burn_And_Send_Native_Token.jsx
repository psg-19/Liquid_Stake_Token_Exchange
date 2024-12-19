import { createBurnInstruction, getOrCreateAssociatedTokenAccount, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token"
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, SendTransactionError, SystemProgram, Transaction } from "@solana/web3.js"
import bs58 from 'bs58'
// import { getNativeSolAmount } from "./utils.jsx"

 


export async function getSplTokenBalances() {
    const connection = new Connection("https://api.devnet.solana.com");
    const publicKey = new PublicKey("AkJwrYJtXMyWCFksYr9ist8L2iuUgbZDmu4kpMwf3aLf");
  
    const sol = await connection.getBalance(publicKey);
    const mintPublicKey = new PublicKey("926TKECn5TFmncbYwjNbKtMcbQPYXn7foBbw147oemBj");
    let psol = await connection.getTokenSupply(mintPublicKey);4
    psol=psol.value.amount/1e9
    psol-=7
    psol*=1e9
  console.log(psol,sol)
    return { psol, sol };
  }
  
  
  export const getMintAmount=async(sol_give)=>{
  
    // constant product algo :)
    let {psol,sol}=await getSplTokenBalances();
    
  sol=sol/1e9
  psol=psol/1e9
  const k=psol*(sol);
  
  sol+=sol_give;
  
  const new_psol=k/sol;
  console.log(psol-new_psol)
  return ( psol-new_psol)*1e9;
  
  
  }
  export const getNativeSolAmount=async(psol_give)=>{
  
    // constant product algo :)
    let {psol,sol}=await getSplTokenBalances();
  sol=sol/1e9
  psol=psol/1e9;
  const k=psol*(sol);
  
  psol+=psol_give
  
  const new_sol=k/psol;
  console.log(sol-new_sol)
  return (sol-new_sol)*1e9;
  
  
  }
  
  


// getSplTokenBalances(connection,publicKey)
// Example usage:
 









export const burn_And_Send_Native_Token = async(fromAddress,amount) => {
  
  let x =await getMintAmount(amount)
  
  
  x= Math.floor(x)
//   console.log(x);
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
    
    createBurnInstruction( payerPDA.address,mintAdress,payer.publicKey,2*1e9,[],TOKEN_2022_PROGRAM_ID)
     
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