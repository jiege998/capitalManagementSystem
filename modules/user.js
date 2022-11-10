// @ts-nocheck
const mongoose = require('mongoose')
const Scheam = mongoose.Schema
const UserScheam = new Scheam({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    },
    identity:{
        type:String,
        required:true,
    },
    data:{
        type:Date,
        default:Date.now
    }
})
module.exports = User=mongoose.model('user',UserScheam)