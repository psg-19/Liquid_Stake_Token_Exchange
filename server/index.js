const express=require('express')
const app=express()
// const {mintToken} =require('./src/mintToken.jsx')
const {
    Connection,
    Keypair,
    PublicKey,
    clusterApiUrl,
    sendAndConfirmTransaction
  } =require ("@solana/web3.js");
  const {
    createMint,
    getOrCreateAssociatedTokenAccount,
    mintTo,
  } =require ("@solana/spl-token");
const { mintToken } = require('./src/mintToken.jsx');
const { burn_And_Send_Native_Token } = require('./src/burn_And_Send_Native_Token.jsx');
const { getSplTokenBalances, getMintAmount, getNativeSolAmount } = require('./src/utils.js');
 

require('dotenv').config();

app.use(express.json());
 
app.post('/helius',async(req,res)=>{

  // console.log(req.body[0])
 
 
  
  
  const arr=req.body[0].description.split(" ")
  const fromAddress= arr[0]
  const toUserAccount= arr[5]
  let amount= arr[2]
const tokenType=arr[3]

// console.log(arr)
amount*=1e9
// console.log(fromAddress,"\n",toUserAccount,"\n",amount,"\n",tokenType)
// console.log(toUserAccount,amount,arr[3])
// console.log(toUserAccount=="AkJwrYJtXMyWCFksYr9ist8L2iuUgbZDmu4kpMwf3aLf")
    if(amount>0&&toUserAccount=="AkJwrYJtXMyWCFksYr9ist8L2iuUgbZDmu4kpMwf3aLf."&&tokenType=="SOL"){
        mintToken(fromAddress,amount)
        console.log("mint karo laude")
        
    }

    else if(tokenType=="926TKECn5TFmncbYwjNbKtMcbQPYXn7foBbw147oemBj"&&toUserAccount=="AkJwrYJtXMyWCFksYr9ist8L2iuUgbZDmu4kpMwf3aLf.")
{
console.log("burnnn")
  burn_And_Send_Native_Token(fromAddress,amount)
  // console.log("burn and send bhadu")

} 
    // console.log(fromAddress,toUserAccount,amount)

    // console.log(req.body)
 //--------------------------------

//  burn_And_Send_Native_Token(fromAddress,amount)
//   const x=await getSplTokenBalances()
// .then((e)=>console.log(e))
///-------------------------------
// (1)
// burn_And_Send_Native_Token(fromAddress,amount/1e9)
 


return res.send(arr)
})
 
//-------------server started---------------------

app.listen(3000,()=>{
console.log(`server started at port 3000`)
})
