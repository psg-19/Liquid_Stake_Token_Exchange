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

  console.log(req.body)

 
    // const fromAddress="2xoWhdsoHRQFJKMRSSKQqu5vpCtWEKax6ZQ5ZZsUhm3Q"
    // const toUserAccount="AkJwrYJtXMyWCFksYr9ist8L2iuUgbZDmu4kpMwf3aLf"
    // const amount=1e9
    
// console.log(req.body)
    // if(amount>0&&toUserAccount==="AkJwrYJtXMyWCFksYr9ist8L2iuUgbZDmu4kpMwf3aLf"){
    //     mintToken(fromAddress,amount)
        
    // }
    // console.log(fromAddress,toUserAccount,amount)

    // console.log(req.body)
 //--------------------------------

//  burn_And_Send_Native_Token(fromAddress,amount)
//   const x=await getSplTokenBalances()
// .then((e)=>console.log(e))
///-------------------------------
// (1)
// burn_And_Send_Native_Token(fromAddress,amount/1e9)
 


return res.send(req.body)
})
 
//-------------server started---------------------

app.listen(3000,()=>{
console.log(`server started at port 3000`)
})
