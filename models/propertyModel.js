const { type } = require('express/lib/response')
const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
    location:{
       type:String,
       required:true 
    },
    propertyType:{
        type:String,
        required:true 
     },
     purpose:{
        type:String,
        required:true 
     },
     price:{
        type: Number,
        required: true
     },
     contactNo: {
        type: String,
        required: true,
        match: /^[+]?[0-9]{1,3}?[-. (]?[0-9]{1,4}?[-. )]?[0-9]{1,4}[-. ]?[0-9]{1,9}$/
    },
     title:{
        type:String,
        required:true 
     },
     description:{
        type:String,
        required:true 
     },
     propertyImg:{
        type:String,
        required:true 
     },
     userId:{
        type:String,
        required:true 
     }

})

const properties = mongoose.model("properties",propertySchema)

module.exports = properties