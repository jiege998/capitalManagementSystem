<template>
    <div class="register">
        <div class="form">
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" :hide-required-asterisk="true"
                label-width="80px" class="demo-ruleForm" status-icon>
                <p class="title">用户注册</p>
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email" placeholder="请输入邮箱"/>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item label="确认密码" prop="password1">
                    <el-input v-model="ruleForm.password1" placeholder="请输入确认密码" />
                </el-form-item>
                <el-form-item label="用户等级" prop="identity">
                    <el-select v-model="ruleForm.identity" style="width: 100%;" placeholder="请选择等级">
                        <el-option label="管理员" value="1" />
                        <el-option label="普通用户" value="0" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  @click="submitForm(ruleFormRef)" :loading="loading">注册</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>
<script setup>
import { reactive, ref ,getCurrentInstance} from 'vue'
import cryptoJSObj from "@/assets/crypto/index.js";
import {useRouter} from 'vue-router'
const ruleFormRef = ref()
const loading = ref(false)
const { proxy } =getCurrentInstance();//获取挂载在全局的属性
const ruleForm = reactive({
    name: '',
    email: '',
    password: '',
    password1: '',
    identity: '',
})
const router = useRouter()
const validatePass = (rule, value, callback) => {
    if (value !== ruleForm.password) {
        callback(new Error(rule.message))
    }
    callback()
}
const rules = reactive({
    name: [
        { required: true, message: '请输入名字', trigger: 'blur' },
        { min: 5, max: 10, message: '长度在5到10个字符', trigger: 'blur' },
    ],
    email: [
        {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur',
        },
        {
            type: 'email',
            message: '请输入正确的邮箱格式',
            trigger: 'blur',
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
        },
        { min: 5, max: 18, message: "长度在 5 到 18 个字符", trigger: 'blur' }
    ],
    password1: [
        {
            validator: validatePass,
            message: '确认密码必须和密码一致',
            trigger: 'blur',
        },
        {
            required: true,
            message: '请输入确认密码',
            trigger: 'blur',
        },
    ],
    identity: [
        {
            required: true,
            message: '用户等级必须选择',
            trigger: 'blur',
        },
    ],
})
const submitForm =async (formEl) => {
    if (!formEl) return
    loading.value = true
  await formEl.validate((valid, fields) => {
    if (valid) {
        let newruleForm={
            name:ruleForm.name,
            email:ruleForm.email,
            password:cryptoJSObj.encryptFunc(ruleForm.password),
            identity: ruleForm.identity
        }
        proxy.$axios({
        url:'user/register',
        method:'post',
        data:newruleForm
      }).then(res=>{
        loading.value = false
        if(res.data.code == 0){
            router.push('/login')
            ruleForm.name =''
            ruleForm.email =''
            ruleForm.password=''
            ruleForm.password1=''
            ruleForm.identity=''
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
.register {
    width: 100vw;
    height: 100vh;
    background-image: url('../../assets/img/rbg.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .form {
        width: 500px;
        height: 400px;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background-color:rgba(255,255,255, .8);
        box-shadow: 0 0 5px 5px rgba(255,255,255, .8);
        .demo-ruleForm{
            width: 480px;
            .title {
            text-align: center;
           color: rgba(0,0,0, .5);
            margin-bottom: 50px;
            font-size: 20px;
        }
        .el-button{
            width: 300px;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            margin-left: -18px;

        }
        }
       
    }
}
</style>
 