<template>
<div>
<!-- 定义子组件 -->
<el-image style="width: 100%; height: 100%; " :src="url"/>
</div>
</template>
<script>
// 解构
import { defineComponent
} from 'vue'
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
    const url =
  'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
// 这里没有this,直接使用props里数据
return {
    url
}
}
})
</script>
<style scoped>
/* scoped 使用得定义的样式只在本页面内生效  */
</style>
 