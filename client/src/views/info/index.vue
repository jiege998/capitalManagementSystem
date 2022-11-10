<template>
<div >
    <div class="common-layout">
    <el-container>
      <el-aside width="400px">
        <el-avatar :size='200'  :src="user?.avatar" />
      </el-aside>
      <el-main>
        <p>{{user?.name}}</p>
        <p>{{user?.identity == 0 ?'普通用户':'管理员'}}</p>
      </el-main>
    </el-container>
  </div>
</div>
</template>
<script>
// 解构
import { defineComponent,reactive
} from 'vue'
import { useStore } from 'vuex'
import jwt_decode from 'jwt-decode'
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
const store  = useStore()
const user = store.state.user.name ? store.state.user : reactive(jwt_decode(sessionStorage.getItem('Authorization')))
return {
    user
}
}
})
</script>
<style scoped>
/* scoped 使用得定义的样式只在本页面内生效  */
.el-aside {
        height: calc(100vh - 80px);
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        border-right: 1px solid red;
    }

    .el-main {
        height: calc(100vh - 100px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        overflow: hidden;
    }
</style>
 