require('dotenv').config()
const express=require('express')
const connectTodatabase = require('./database')
const Blog = require('./model/blogModel')
const {multer,storage}=require('./midleware/multerConfig')
const upload=multer({storage})
const cors=require('cors')
const app=express()
const fs=require('fs')
app.use(express.json())
connectTodatabase()
app.use(cors({
    origin:"http://localhost:5173"
}) )

//get all blogs



app.get('/blog',async(req,res)=>{
    const blogs=await Blog.find() //array
    res.status(200).json({
        message:'blogs fetched successfully!',
        data:blogs
    })
})


//get single blog


app.get('/blog/:id',async(req,res)=>{
    const id=req.params.id

    
    const blog=await Blog.findById(id) //object
    if(!blog){
        return  res.json(404).json({
              message:'data not found'
          })
      }
res.status(200).json({
    message:'single blog fetched successfully!',
    data:blog
})
})





//to create blog


app.post("/blog",upload.single('image'),async(req,res)=>{
    const {title,subtitle,description}=req.body
 
   let filename;
   if(req.file){
    filename='http://localhost:3000/' + req.file.filename
   }
   else{
    filename="https://cdn2.hubspot.net/hubfs/263750/blogging-083016.jpg"
   }
    
    if(!title || !description || !subtitle){
        return res.status(400).json({
            message:"Please provide all data correctly!!"
        })
    }
    const createBlog=await Blog.create({title,subtitle,description,image:filename})
 
    res.status(201).json({
        message:"blog api hit successfully!!",
      data:createBlog
    })
})


//edit blog



app.patch('/blog/:id',upload.single('image'),async(req,res)=>{
    const id=req.params.id
const {title,subtitle,description}=req.body
let fileName;
if(req.file){
    fileName='http://localhost:3000/' + req.file.filename
    const blog=await Blog.findById(id)
    const oldFileName=blog.image

    fs.unlink(`./storage/${oldFileName}`,(err)=>{
        if(err){
            console.log(err);
            
        }
        else{
            console.log('file deleted successfully');
            
        }
    })
}
const updateBlog=await Blog.findByIdAndUpdate(id,{title,subtitle,description,image:fileName})
res.status(200).json({
    message:'blog updated succesfully!!',
    data:updateBlog
})

})

//delete blog

app.delete('/blog/:id',async(req,res)=>{
    const id=req.params.id
    const blog=await Blog.findById(id)
    const filename=blog.image
  
  
    fs.unlink(`./storage/${filename}`,(err)=>{
        if(err){
            console.log(err);
            
        }
        else{
            console.log('file deleted successfully!');
            
        }
          })
await Blog.findByIdAndDelete(id)
res.status(200).json({
    message:'blog delete successfully!!'
})
})








app.use(express.static('./storage'))


app.listen(process.env.PORT,()=>{
    console.log('Node Js project has been started,3000');
    
})


//