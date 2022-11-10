<template>
    <div>
        <!-- 定义子组件 -->
        <el-row>
            <el-col :span="20">
                <span class="title">投标时间筛选:</span>
                <el-time-picker size="large" v-model="datatime" is-range range-separator="--" start-placeholder="开始时间"
                    end-placeholder="结束时间" />
                <el-button type="primary" @click="fliter">筛选</el-button>
            </el-col>
            <el-col :span="4">
                <el-button class="add" v-if="user.identity == 1" @click="open" type="primary">
                    添加
                </el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-table class="table" :border="true" :data="data.tableData" style="width: 100%"  >
                <el-table-column fixed prop="date" label="创建时间" width="300">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <el-icon>
                                <timer />
                            </el-icon>
                            <span style="margin-left: 10px">{{ scope.row.date }}</span>
                        </div>
                    </template>
                </el-table-column>/>
                <el-table-column prop="type" label="收支类型" width="120" />
                <el-table-column prop="describe" label="收支描述" width="120" />
                <el-table-column prop="incode" label="收入" width="200">
                    <template #default="scope">
                        <el-tag type="success">
                            + {{ scope.row.incode }}
                        </el-tag>
                    </template>
                </el-table-column> />
                <el-table-column prop="expend" label="支出" width="200">
                    <template #default="scope">
                        <el-tag type="danger">
                            - {{ scope.row.expend }}
                        </el-tag>
                    </template>
                </el-table-column> />
                <el-table-column prop="cash" label="账户资金" width="200">
                    <template #default="scope">
                        <el-tag type="">
                            {{ scope.row.cash }}
                        </el-tag>
                    </template>
                </el-table-column> />
                <el-table-column prop="remark" label="备注" width="300" />
                <el-table-column label="操作" v-if="user.identity == 1">
                    <template #default="scope">
                        <el-button type="primary" size="small" @click="editOpen(scope.row)">修改</el-button>
                        <el-button type="danger" @click="deleteItem(scope.row)" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row>
            <el-pagination class="pagination" v-model:currentPage="currentPage" :default-page-size="1"
                :page-sizes="[1, 2, 3, 4]" layout="total, sizes, prev, pager, next, jumper" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-row>
        <el-dialog v-model="dialogVisible" :title="isAdd ? '添加资金流水' : '修改资金流水'" width="50%" @close="clean">
            <div class="form">
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" :hide-required-asterisk="true"
                    label-width="80px" class="demo-ruleForm" status-icon>
                    <el-form-item label="收支类型" prop="type">
                        <el-input v-model="ruleForm.type" placeholder="请输入收支类型" />
                    </el-form-item>
                    <el-form-item label="收支描述" prop="describe">
                        <el-input v-model="ruleForm.describe" placeholder="请输入收支描述" />
                    </el-form-item>
                    <el-form-item label="收入" prop="incode">
                        <el-input type="number" v-model="ruleForm.incode" placeholder="请输入收入" />
                    </el-form-item>
                    <el-form-item label="支出" prop="expend">
                        <el-input type="number" v-model="ruleForm.expend" placeholder="请输入支出" />
                    </el-form-item>
                    <el-form-item label="账户现金" prop="cash">
                        <el-input type="number" v-model="ruleForm.cash" placeholder="请输入账户现金" />
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="ruleForm.remark" placeholder="请输入备注" />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="close(ruleFormRef)">取消</el-button>
                    <el-button type="primary" @click="isAdd ? add(ruleFormRef) : edit(ruleFormRef)">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import { reactive, ref, getCurrentInstance, onMounted } from 'vue'
import { useStore } from 'vuex';
import jwt_decode from 'jwt-decode'
const { proxy } = getCurrentInstance();//获取挂载在全局的属性
const dialogVisible = ref(false)
const currentPage = ref(1)
const total = ref(0)
const pageSize = ref(1)
const ruleFormRef = ref()
const store = useStore()
const user = store.state.user.name ? store.state.user : reactive(jwt_decode(sessionStorage.getItem('Authorization')))
const ruleForm = reactive({
    type: '',
    describe: '',
    incode: '',
    expend: '',
    cash: '',
    remark: ''
})
const datatime = ref([
    new Date(),
    new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1),
])
const isAdd = ref(false)
const rules = reactive({
    incode: [
        { required: true, message: '请输入收入', trigger: 'blur' },
    ],
    expend: [
        {
            required: true,
            message: '请输入支出',
            trigger: 'blur',
        },
    ],
    cash: [
        {
            required: true,
            message: '请输入账户现金',
            trigger: 'blur',
        },
    ],
})
const filterData = reactive({
    data: []
})
const data = reactive({
    tableData: []
})
const tableList = reactive({ data: [] })
const list = () => {
    proxy.$axios({
        url: `/profile/list`,
        method: 'get',
    }).then(res => {
        total.value = res.data.count
        tableList.data = res.data.data
        filterData.data = res.data.data
        data.tableData = res.data.data.slice(0, pageSize.value)
    })
}
onMounted(() => {
    list()
})
const open = () => {
    dialogVisible.value = true
    isAdd.value = true
}
const clean = () => {
    ruleFormRef.value.resetFields()
}
const row_id = ref('')
const editOpen = (row) => {
    dialogVisible.value = true
    isAdd.value = false
    row_id.value = row._id
    proxy.$axios({
        url: `/profile/${row._id}`,
        method: 'get',
    }).then(res => {
        ruleForm.type = res.data.data.type,
            ruleForm.describe = res.data.data.describe,
            ruleForm.incode = res.data.data.incode,
            ruleForm.expend = res.data.data.expend,
            ruleForm.cash = res.data.data.cash,
            ruleForm.remark = res.data.data.remark
    })
}
const add = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            proxy.$axios({
                url: '/profile/add',
                method: 'post',
                data: ruleForm
            }).then(res => {
                if (res.data.code == 0) {
                    dialogVisible.value = false
                    formEl.resetFields()
                    list()
                }
            })
        }
    })
}
const edit = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            proxy.$axios({
                url: `/profile/edit/${row_id.value}`,
                method: 'post',
                data: ruleForm
            }).then(res => {
                if (res.data.code == 0) {
                    dialogVisible.value = false
                    formEl.resetFields()
                    list()
                }
            })
        }
    })
}
const deleteItem = (row) => {
    proxy.$axios({
        url: `/profile/delete/${row._id}`,
        method: 'delete',
    }).then(res => {
        if (res.data.code == 0) {
            list()
        }
    })
}
const close = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
    dialogVisible.value = false
}
const fliter = () => {
    if (data.tableData.length > 0 && datatime.value) {
        filterData.data = tableList.data.filter(item => {
            return new Date(item.date).getTime() > new Date(datatime.value[0]).getTime() && new Date(item.date).getTime() < new Date(datatime.value[1]).getTime()
        })
        pageSize.value = 1
        currentPage.value = 1
        total.value = filterData.data.length
        handleSizeChange(1)
    } else {
        list()
    }
}
const handleSizeChange = (val) => {
    pageSize.value = val
    currentPage.value = 1
    data.tableData = filterData.data.filter((item, index) => {
        return index < val
    })
}
const handleCurrentChange = (val) => {
    currentPage.value = val
    // pageSize.value = 1
    data.tableData = []
    for (let i = (val - 1) * (pageSize.value); i < val * pageSize.value; i++) {
        if (filterData.data[i]) {
            data.tableData.push(filterData.data[i])
        }
    }
}

</script>
<style scoped>
/* scoped 使用得定义的样式只在本页面内生效  */

.title {
    font-size: 15px;
    margin-right: 5px;
}

.add {
    float: right;
}

.table {
    margin-top: 50px;
}

.pagination {
    position: absolute;
    right: 0;
}

.el-button {
    margin-left: 10px;
}
</style>
 