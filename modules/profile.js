// @ts-nocheck
const mongoose = require('mongoose')
const Scheam = mongoose.Schema
const ProfileScheam = new Scheam({
    type:{
        type:String,
    },
    describe:{
        type:String,
    },
    incode:{
        type:String,
        required:true
    },
    expend:{
        type:String,
        required:true
    },
    cash:{
        type:String,
        required:true,
    },
    remark:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports = User=mongoose.model('profiles',ProfileScheam)