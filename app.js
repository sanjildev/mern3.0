require('dotenv').config()
const express=require('express')
const connectTodatabase = require('./database')
const Blog = require('./model/blogModel')
const {multer,storage}=require('./midleware/multerConfig')
const upload=multer({storage})
const app=express()
app.use(express.json())
connectTodatabase()


app.get('/blog',(req,res)=>{
    res.status(200).send('hello and bye world!! ') //this is in plain text format
})



//post


app.post("/blog",upload.single('image'),async(req,res)=>{
    const {title,subtitle,description,image}=req.body
    if(!title || !description || !subtitle || !image){
        return res.status(400).json({
            message:"Please provide all data correctly!!"
        })
    }
    const createBlog=await Blog.create({title,subtitle,description,image})
 
    res.status(201).json({
        message:"blog api hit successfully!!",
      data:createBlog
    })
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