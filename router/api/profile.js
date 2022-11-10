// @ts-nocheck
const express = require('express')

//处理token
const profile = require('../../modules/profile')
const passport = require('passport')
const router = express.Router()
//添加
router.post('/add',passport.authenticate("jwt",{session:false}),(req,res)=>{
    let profileFields={}
    if(req.body.type){
        profileFields.type = req.body.type
    }
    if(req.body.incode){
        profileFields.incode = req.body.incode
    }
    if(req.body.expend){
        profileFields.expend = req.body.expend
    }
    if(req.body.remark){
        profileFields.remark = req.body.remark
    }
    if(req.body.cash){
        profileFields.cash = req.body.cash
    }
    if(req.body.describe){
        profileFields.describe = req.body.describe
    }
  let oneProfile = new profile(profileFields)
  oneProfile.save().then(val=>{
        res.json({
            msg:'添加成功',
            code:0,
            data:val
        })
   }).catch(err=>{
     throw err
   })
})
//列表查询接口
router.get('/list',passport.authenticate("jwt",{session:false}),(req,res)=>{
    let  countNum = 0
    profile.count({}, (err, count) => {
        // console.log('总共有多少', count);
        countNum = count
    })
    profile.find({})
            .then((dosc) => {
                res.send({
                    status: "success",
                    data: dosc,
                    count: countNum
                })
                return res;
            })
            .catch((error) => {
                console.log(`${error}`);
                return false;
                })
})
//单条查询
router.get('/:id',passport.authenticate("jwt",{session:false}),(req,res)=>{
    profile.findOne({_id:req.params.id}).then(val=>{
        if(!val){
            return res.status(404).json('没有任何内容')
        }
        res.json({
            msg:'success',
            data:val
        })
    }).catch(err=>{
        res.json({
            msg:'error',
            data:err
        })
    })
})
//编辑
router.post('/edit/:id',passport.authenticate("jwt",{session:false}),(req,res)=>{
    let profileFields={}
    if(req.body.type){
        profileFields.type = req.body.type
    }
    if(req.body.incode){
        profileFields.incode = req.body.incode
    }
    if(req.body.expend){
        profileFields.expend = req.body.expend
    }
    if(req.body.remark){
        profileFields.remark = req.body.remark
    }
    if(req.body.cash){
        profileFields.cash = req.body.cash
    }
    if(req.body.describe){
        profileFields.describe = req.body.describe
    }
    profile.findOneAndUpdate({_id:req.params.id},{$set:profileFields},{new:true}).then(val=>{
        res.json({
            msg:'编辑成功',
            code:'0',
            data:val
        })
   }).catch(err=>{
    res.json({
        msg:'编辑失败',
        data:err
    })
   })
})
//删除
router.delete('/delete/:id',passport.authenticate("jwt",{session:false}),(req,res)=>{
    profile.findOneAndRemove({_id:req.params.id}).then(val=>{
        if(!val){
            return res.status(404).json('没有任何内容')
        }
        res.json({
            msg:'删除成功',
            code:0,
            data:val
        })
    }).catch(err=>{
        res.json({
            msg:'删除失败',
            data:err,
            code:1
        })
    })
})
module.exports = router