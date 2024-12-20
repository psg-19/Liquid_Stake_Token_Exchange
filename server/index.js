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


// app.use(cors({
//   origin: "*",
// //   origin: FRONTEND_URL,

//   optionsSuccessStatus: 200,
//   credentials: true 
// }));


function getDaysSince() 
{
  
  let startDate=Date.parse("2024-12-20T14:24:51.225Z")
  const currentDate = new Date();
  const timeDiff = currentDate - new Date(startDate);
  const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
  return  (daysDiff);
}

function getSolanaFromLST(lstAmount) {
  const daysPassed = getDaysSince();
  const lstValue = 1 + (0.00000001* daysPassed);
  const solanaEquivalent = lstAmount * lstValue;
  return solanaEquivalent;
}

function getLSTFromSolana(solanaAmount) {
  const daysPassed = getDaysSince();
  const lstValue = 1 + (0.00000001 * daysPassed);
  const lstEquivalent = solanaAmount / lstValue;
  return lstEquivalent;
}


 





app.post('/getPSOL',async(req,res)=>{
  const amount=req.body.sol;
  const psol = getLSTFromSolana(amount);
  return res.send({psol})
  
})


app.post('/getSOL',async(req,res)=>{
  // console.log(req.body)
  const amount=req.body.psol;
  console.log("amount = ",amount)
  const sol = getSolanaFromLST(amount);
  console.log(sol)

  return res.send({sol})

})



 
app.post('/helius',async(req,res)=>{

  // console.log(req.body[0])
 
 
  
  
  const arr=req.body[0].description.split(" ")
  const fromAddress= arr[0]
  const toUserAccount= arr[5]
  let amount= arr[2]
const tokenType=arr[3]
 
amount*=1e9 
console.log(arr)
    if(amount>0&&toUserAccount=="AkJwrYJtXMyWCFksYr9ist8L2iuUgbZDmu4kpMwf3aLf."&&tokenType=="SOL"){
       await mintToken(fromAddress,amount)
        console.log("mint karo laude")
        
    }

    else if(tokenType=="926TKECn5TFmncbYwjNbKtMcbQPYXn7foBbw147oemBj"&&toUserAccount=="AkJwrYJtXMyWCFksYr9ist8L2iuUgbZDmu4kpMwf3aLf.")
{
console.log("burnnn")
 await burn_And_Send_Native_Token(fromAddress,amount)
  console.log("burn and send bhadu")

}  


return res.send(arr)
})
 
//-------------server started---------------------

app.listen(3000,()=>{
console.log(`server started at port 3000`)
})
