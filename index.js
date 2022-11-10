// @ts-nocheck
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('./config/keys').mongoURL
const mongoose = require('mongoose')
//引入user
const user = require('./router/api/user')
//使用body-parser中间件 这样才能使用post请求
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//使用passport 解析token
const passport = require('passport')
const profile = require('./router/api/profile')
//连接mongoDB数据库
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true}).then(res=>{
    console.log('成功了')
}).catch(err=>{
    console.log(err)
})
//passport 初始化
app.use(passport.initialize())
require('./config/passport')(passport)
const port = process.env.PORT || 5000
app.use('/api/user',user)
app.use('/api/profile',profile)
app.listen(port,()=>{
    console.log('服务开启了')
})