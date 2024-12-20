
import {  getOrCreateAssociatedTokenAccount, mintTo, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token"
import { Connection, Keypair, PublicKey } from "@solana/web3.js"
import bs58 from 'bs58'


export async function getSplTokenBalances(solAmt,psolAmt) {
  const connection = new Connection("https://api.devnet.solana.com");
  const publicKey = new PublicKey("AkJwrYJtXMyWCFksYr9ist8L2iuUgbZDmu4kpMwf3aLf");

  let sol = await connection.getBalance(publicKey);
  const mintPublicKey = new PublicKey("926TKECn5TFmncbYwjNbKtMcbQPYXn7foBbw147oemBj");
  let psol = await connection.getTokenSupply(mintPublicKey);
  psol=psol.value.amount
   psol-=psolAmt
   sol-=solAmt
console.log(psol,sol)
  return { psol, sol };
}


export const getMintAmount=async(sol_give)=>{

  // constant product algo :)
  let {psol,sol}=await getSplTokenBalances(sol_give,0);
  
sol=sol/1e9
psol=psol/1e9

sol_give/=1e9

const k=psol*(sol);

sol+=sol_give;

const new_psol=k/sol;
// console.log(psol-new_psol)
return ( psol-new_psol)*1e9;


}
export const getNativeSolAmount=async(psol_give)=>{

  // constant product algo :)
  let {psol,sol}=await getSplTokenBalances(0,psol_give);
sol=sol/1e9
psol=psol/1e9;
const k=psol*(sol);
psol_give/=1e9
psol+=psol_give

const new_sol=k/psol;
console.log(sol-new_sol)
return (sol-new_sol)*1e9;


}



 
const connection=new Connection("https://api.devnet.solana.com")


export const mintToken=async(fromAddress,amount)=>{

  console.log("mintiiiiiiii")


const dest=new PublicKey(fromAddress);
const payer=  Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY  ))
const mintAdress=new PublicKey("926TKECn5TFmncbYwjNbKtMcbQPYXn7foBbw147oemBj")
 
console.log("hiii "+amount)
let x =await getMintAmount(amount)


console.log("hiii ",x)
x= Math.floor(x)
console.log("hiii ",x)
// console.log(x)

// return
const destPDA=await getOrCreateAssociatedTokenAccount(
   connection,
  payer,
  mintAdress,
  dest,
  true,
  "confirmed",
  undefined,
  TOKEN_2022_PROGRAM_ID
)
// amount=getMintAmount(amount)



  await mintTo(connection,payer,mintAdress,destPDA.address,payer,x,[],undefined,TOKEN_2022_PROGRAM_ID)
  .then((e)=>console.log(e))
.catch((e)=>console.log(e))

 
}