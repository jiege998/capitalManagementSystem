<template>
<div class="notFound">
<!-- 定义子组件 -->
</div>
<el-button class='button' @click="goHome">返回首页</el-button>
</template>
<script>
// 解构
import { defineComponent
} from 'vue'
import { useRouter } from 'vue-router'
// 模块化
export default defineComponent({
name:'Home', //组件名称
props: {
// 接收父组件数据
},
components: {
// 定义子组件
},
setup(props, ctx){
// 这里没有this,直接使用props里数据
const router = useRouter()
const goHome = function(){
    router.push({
        path:'/home',
        meta:{
            title:'首页'
        }
    })
}
return {
    goHome
}
}
})
</script>
<style scoped>
/* scoped 使用得定义的样式只在本页面内生效  */
.notFound{
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/img/404.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.button{
    width: 120px;
    height: 30px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 200px;
    background-color: rgb(228,213,0);
    color: #fff;
}
</style>
 