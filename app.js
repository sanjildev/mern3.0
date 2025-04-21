require('dotenv').config()
const express=require('express')
const connectTodatabase = require('./database')
const app=express()

connectTodatabase()
app.get('/',(req,res)=>{
    res.status(200).send('hello and bye world!! ') //this is in plain text format
})


app.get('/about',(req,res)=>{
res.status(200).json({
    message:'This is about page' //this is in json format
})
})
app.listen(process.env.PORT,()=>{
    console.log('Node Js project has been started,3000');
    
})


//