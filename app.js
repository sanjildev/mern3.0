
const express=require('express')
const app=express()


app.get('/',(req,res)=>{
    res.send('hello and bye world!! ') //this is in plain text format
})


app.get('/about',(req,res)=>{
res.json({
    message:'This is about page' //this is in json format
})
})
app.listen(3000,()=>{
    console.log('Node Js project has been started,3000');
    
})