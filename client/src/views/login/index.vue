<template>
    <div class="login">
        <!-- 定义子组件 -->
        <vue-particles 
             color="#000" 
             :particleOpacity="0.7" 
             :particlesNumber="80" 
             shapeType="circle" 
             :particleSize="4"
             linesColor="#dedede" 
             :linesWidth="1" 
             :lineLinked="true" 
             :lineOpacity="0.4" 
             :linesDistance="150"
             :moveSpeed="3" 
             :hoverEffect="true" 
             hoverMode="grab" 
             :clickEffect="true" 
             clickMode="push">
        </vue-particles>
        <div class="admin">
            <div class="title">资金后台管理系统</div>
            <div class="content">
                <el-form  ref="ruleFormRef" :rules="rule" :hide-required-asterisk="true" :model="loginForm" label-width="80px">
                    <el-form-item label="邮箱" prop="email">
                        <el-input placeholder="请输入邮箱" v-model="loginForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input placeholder="请输入密码" type="password"  show-password v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="login(ruleFormRef),2000" :loading-icon="Eleme" :loading="loading">登录</el-button>
                    </el-form-item>
                </el-form>
                <span class="register">还没有账号？现在<router-link to='/register'>注册</router-link></span>
            </div>
        </div>
    </div>
</template>
<script setup>
// 解构
import {
    ref,
    reactive,
    getCurrentInstance
} from 'vue'
import { Eleme } from '@element-plus/icons-vue'
import jwt_decode  from 'jwt-decode'
import cryptoJSObj from "@/assets/crypto/index.js";
import {useRouter} from 'vue-router'
import { useStore } from 'vuex';
import { isEmpty } from 'lodash';
const store = useStore()
const { proxy } =getCurrentInstance();//获取挂载在全局的属性
const router = useRouter()
const loginForm = reactive({
        email:'',
        password:'' 
}) 
let loading = ref(false)
const rule =reactive({
    email:[
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur',}
        ],
    password:[
        {required: true, message: '请输入密码', trigger: 'blur'},
        {min: 5,max: 18,message: "长度在 5 到 18 个字符",trigger: 'blur'}
        ]
}) 
const ruleFormRef = ref()
const login =  (formEl)=>{
    if (!formEl) return
    loading.value = true
    formEl.validate((valid, fields) => {
    if (valid) {
       let newloginForm={
            email:cryptoJSObj.encryptFunc(loginForm.email,"TLhd5tcTFxEDXF3w"),
            password:cryptoJSObj.encryptFunc(loginForm.password,"TLhd5tcTFxEDXF3w")
        }
        proxy.$axios({
        url:'user/login',
        method:'post',
        data:newloginForm
      }).then(res=>{
        loading.value = false
        if(res.data.code == 0){
            router.push('/home')
            window.sessionStorage.setItem('Authorization',res.data.data)
            //解析token
            const jwtdecode = jwt_decode(res.data.data)
            store.dispatch("setAUthenticaten",!isEmpty(jwtdecode))
            store.dispatch("setUser",jwtdecode)
            loginForm.email =''
            loginForm.password=''
        }
      }).catch(err=>{
        loading.value = false
        new Error(err)
      })    
    } else {
        loading.value = false
    }
  })
}
</script>
<style scoped lang="less">
/* scoped 使用得定义的样式只在本页面内生效  */

.login {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-image: url('../../assets/img/bg.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .admin {
        position: absolute;
        width: 500px;
        height: 300px;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        background-color: #fff;
        box-shadow:0 0 5px 5px #FFF;

        .title {
            width: 200px;
            margin: auto;
            padding-top: 30px;
            text-align: center;font-size: 20px;
        }

        .content {
            margin-top: 50px;
            width: 450px;

            .el-button {
                margin: auto;
                width: 200px;
            }

            .register {
                font-size: 12px;
                position: absolute;
                right: 20px;

            }
        }
    }

}
</style>
 