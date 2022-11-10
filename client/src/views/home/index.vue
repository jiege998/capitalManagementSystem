<template>
    <div class='home'>
        <div class="card-header">
            <el-row>
                <el-col class="col" :span="22">
                    <el-avatar style="width: 50px; height: 50px;"
                        src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" />
                    <span class="title">资金后台管理系统</span>
                </el-col>
                <el-col class="col" :span="1">
                    <el-avatar :src="user?.avatar" />
                </el-col>
                <el-col class="user" :span="1">
                    <div class="wel">欢迎</div>
                    <div class="name">{{ user.name }}</div>
                </el-col>
                <el-dropdown @command="handleCommand">
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="info">个人信息</el-dropdown-item>
                            <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-row>
        </div>
        <div class="common-layout">
            <el-container>
                <el-aside width="200px">
                    <el-row class="menu_page">
                        <el-col>
                            <el-menu class="el-menu-vertical-demo" background-color="rgb(45, 55, 79)" text-color="#fff"
                                active-text-color="#409eff" :router="true" :default-active="route.path">
                                <router-link to="index">
                                    <el-menu-item index="/home/index">
                                        <el-icon>
                                            <Aim />
                                        </el-icon>
                                        <span slot="title">首页</span>
                                    </el-menu-item>
                                </router-link>
                                <template v-for="item in data.items" :key="item.path">
                                    <el-sub-menu :index="item.path" v-if="item.children">
                                        <template #title>
                                            <el-icon>
                                                <location />
                                            </el-icon>
                                            <span>{{ item.name }}</span>
                                        </template>
                                        <router-link v-for="citem in item.children" :to="citem.path">
                                            <el-menu-item :index="citem.path">
                                                <el-icon>
                                                    <Aim />
                                                </el-icon>
                                                <span slot="title">{{ citem.name }}</span>
                                            </el-menu-item>
                                        </router-link>
                                    </el-sub-menu>
                                    <template v-else>
                                        <router-link :to="item.path">
                                            <el-menu-item :index="citem.path">
                                                <el-icon>
                                                    <Aim />
                                                </el-icon>
                                                <span slot="title">{{ item.name }}</span>
                                            </el-menu-item>
                                        </router-link>
                                    </template>
                                </template>

                            </el-menu>
                        </el-col>
                    </el-row>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </div>
    </div>




</template>
<script setup>
// 解构
import {
    getCurrentInstance, reactive
} from 'vue'
import { useStore } from 'vuex'
import jwt_decode from 'jwt-decode'
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter,useRoute } from 'vue-router'
// 模块化
const { proxy } = getCurrentInstance();//获取挂载在全局的属性
const store = useStore()
const router = useRouter()
const route = useRoute()
const data = reactive({
    items: [
        {
            name: '资金管理',
            path: '/fund',
            children: [{
                name: '资金流水',
                path: '/home/fundlist',
            }]
        },
        {
            name: '信息管理',
            path: '/info',
            children: [{
                name: '个人信息',
                path: '/home/infolist',
            }]
        },
    ]
})
const user = store.state.user.name ? store.state.user : reactive(jwt_decode(sessionStorage.getItem('Authorization')))
const handleCommand = (command) => {
    switch (command) {
        case 'info':
        router.push('infolist')
            break;

        case 'loginout':
            sessionStorage.removeItem('Authorization')
            store.dispatch('clearUser')
            router.push('/')

            break;
    }
}
</script>
<style scoped lang='less'>
/* scoped 使用得定义的样式只在本页面内生效  */
.home {
    height: 100%;
    overflow: hidden;

    .card-header {
        width: 100%;
        background-color: rgb(45, 55, 79);
        font-weight: 700;

        .title {
            margin-left: 15px;
        }

        .el-row {
            height: 80px;
        }

        .el-col.col {
            display: flex;
            align-items: center;
            color: #fff;
        }

        .el-dropdown {
            color: #fff;
            font-weight: 700;
            position: absolute;
            right: 10px;
            top: 50%;

        }

        .el-col.user {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: -30px;

            .wel {
                color: #fff;
                margin-bottom: 5px;
            }

            .name {
                color: rgb(83, 83, 94);
            }
        }

        .example-showcase .el-dropdown+.el-dropdown {
            margin-left: 15px;
        }

        .example-showcase .el-dropdown-link {
            cursor: pointer;
            color: var(--el-color-primary);
            display: flex;
            align-items: center;
        }
    }

    .el-aside {
        background-color: rgb(45, 55, 79);
        height: calc(100vh - 80px);
        overflow: hidden;
    }

    .el-main {
        height: calc(100vh - 100px);
        overflow: hidden;
    }
}
</style>
 