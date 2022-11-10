// @ts-nocheck
const express = require('express')
//密码加密
const bcrypt = require('bcrypt')
//头像
//解密前端传过来的邮箱密码
const {cryptoObj} = require('../../config/crypto/index')
const gravatar = require('gravatar');
//处理token
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
const user = require('../../modules/user')
const passport = require('passport')
const router = express.Router()
//注册接口
router.post('/register',(req,res)=>{
   user.findOne({email:req.body.email}).then(U=>{
    if(U){
        res.json({code:1,msg:'邮箱已被占用'})
    }else{
        const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
        const newUser = new user({
            name:req.body.name,
            email:req.body.email,
            avatar,
            password:cryptoObj.decryptFunc(req.body.password),
            identity:req.body.identity
        })
        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if(err) throw err
                newUser.password = hash
                newUser.save().then(N=>{
                    res.json({code:0,data:N,msg:'注册成功'})
                }).catch(err=>{
                    console.log(err)
                })
            })
        })
    }
   })
})
//登录接口
router.post('/login',(req,res)=>{
    const email = cryptoObj.decryptFunc(req.body.email,"TLhd5tcTFxEDXF3w")
    const password = cryptoObj.decryptFunc(req.body.password,"TLhd5tcTFxEDXF3w")
    user.findOne({email}).then(U=>{
        if(!U){
           res.json({code:1,msg:'用户不存在'})
        }
        //密码匹配
       bcrypt.compare(password,U.password).then(isMatch=>{
            if(isMatch){
                // jwt.sign('规则','加密名字','过期时间','箭头函数')
                const rule={id:U.id,name:U.name,avatar:U.avatar,identity:U.identity}
                jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token)=>{
                    if(err) throw err
                    res.json({code:0,data:`Bearer ${token}`,msg:'登录成功'})
                })
              }else{
                  res.json({code:1,msg:'密码错误'})
              }
        })
    })
})
//$route GET api/users/current
//@desc return current user
//@access private
//验证token得到用户信息
//使用passport-jwt验证token
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.json({data:{
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
        identity:req.user.identity,
        avatar:req.user.avatar

    },code:0}); 
},err=>{
    req.json({
        error,
        code:1,
        msg:'服务器异常'
    })
    return new Error(err)
})
module.exports = router