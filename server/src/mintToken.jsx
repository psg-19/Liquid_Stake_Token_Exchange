
import {  getOrCreateAssociatedTokenAccount, mintTo, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token"
import { Connection, Keypair, PublicKey } from "@solana/web3.js"
import bs58 from 'bs58'


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


 
const connection=new Connection("https://api.devnet.solana.com")


export const mintToken=async(fromAddress,amount)=>{
const dest=new PublicKey(fromAddress);
const payer=  Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY  ))
const mintAdress=new PublicKey("926TKECn5TFmncbYwjNbKtMcbQPYXn7foBbw147oemBj")
console.log(payer)

let x =await getMintAmount(amount)


x= Math.floor(x)
// console.log("hiii ",x)


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