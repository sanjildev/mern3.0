const mongoose=require('mongoose')
const Schema=mongoose.Schema

const blogSchhema=new Schema({
title:{
    type:String,
    unique:true
},
subtitle:{
    type:String
},
descrription:{
    type:Text
},
image:{
    Type:String
}
})
const Blog=mongoose.model('Blog',blogSchhema)
module.exports=Blog