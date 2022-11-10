// passport.js
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
    const mongoose = require("mongoose");
    const user = mongoose.model("user");
    const keys = require("../config/keys");
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();  //通过配置信息来生成jwt的请求，验证这个token
opts.secretOrKey = keys.secretOrKey;
 
module.exports = passport =>{
     passport.use(new JwtStrategy(opts,function(jwt_payload,done){
        user.findById(jwt_payload.id).then(U=>{
            if(U){
                return done(null,U)
            }else{
                return done(null,false)
            }
        }).catch(err=>{
            throw err
        })
     }));
}