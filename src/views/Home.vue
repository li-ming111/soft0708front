<template>
  <el-button type="primary" @click="dialogVisible = true">添加</el-button>
  <el-button type="primary" @click="addPerson">添加独立窗体</el-button>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="姓名" width="180" prop="username"></el-table-column>
    <el-table-column label="性别" width="180" prop="sex"></el-table-column>
    <el-table-column label="年龄" width="180" prop="age"></el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" size="small" @click="handleEdit(scope.row)">
          编辑
        </el-button>
        <el-button type="primary" size="small" @click="handleEdit1(scope.row)">
          编辑独立窗体
        </el-button>
        <el-popconfirm title="是否删除?" 
          confirm-button-text="确定"
          cancel-button-text="取消"
          @confirm="handleDelete(scope.row.id)"
        >
          <template #reference>
            <el-button type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页组件 -->
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[3,5,7]"
    :size="size"
    :disabled="disabled"
    :background="background"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
  <!-- 弹出窗体 -->
  <el-dialog
    v-model="dialogVisible"
    :title="form.id ? '编辑' : '添加'"
    width="500"
  >
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="姓名">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="性别">
      <el-select v-model="form.sex">
        <el-option label="男" value="男" />
        <el-option label="女" value="女" />
      </el-select>
    </el-form-item>  
    <el-form-item label="年龄">
      <el-input-number v-model="form.age" />
    </el-form-item>
  </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveUpdate">
          {{ form ?.id ?'编辑' : '添加' }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref,onMounted,reactive } from 'vue' 
import axios from 'axios';
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

//---------分页
import type { ComponentSize } from 'element-plus'
const currentPage = ref(1)
const pageSize = ref(3)
const size = ref<ComponentSize>('default')
const background = ref(false)
const disabled = ref(false)
const total = ref(0)

const handleSizeChange = (val: number) => {
  pageSize.value = val
  show()
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  show()
}
//---------------
interface User {
  id?:number
  username: string
  sex: string
  age: number
}
//路由跳转
const router = useRouter()
//添加调用表单的方法
const addPerson = () => {
  //路由跳转页面
  router.push('/person')
}


//表单数据
const form = reactive({
  username: '',
  sex: '男',
  age: 1
})

//弹出窗体标识参数
const dialogVisible = ref(false)

//添加数据
const addData = () => {
  axios.post('/api/save', form).then(() => {
    ElMessage({
      message: '添加成功.',
      type: 'success',
    })
    show()    
  })
}
//编辑数据
const editData = () => {
  axios.put('/api/update', form).then(() => {
    ElMessage({
      message: '编辑成功.',
      type: 'success',
    }) 
    show()   
  })
}
const saveUpdate = () => {
  if (form.id) {
    editData()
  } else {
    addData()
  }
  //关闭弹出窗体
  dialogVisible.value = false
  //重新加载数据
  show()
}

const handleEdit1 = (row: User) => {
  //回填数据
  router.push({ 
    path: '/person', 
    state:{
      params:JSON.stringify(row)//转换json格式字符串
    }
  })
}
const handleEdit = (row: User) => {
  //回填数据
  Object.assign(form, row)
  dialogVisible.value = true
}
const handleDelete = (id:number) => {
  axios.delete(`/api/delete/${id}`).then(() => {
    ElMessage({
    message: '删除成功.',
    type: 'success',
  })
    show()
  })
}
//数据源
const tableData = ref([])

const show=()=>{
  axios.get(`/api/findPage/${currentPage.value}/${pageSize.value}`).then((res) => {
    console.log('------------->>>',res.data)
    tableData.value = res.data.data.list
    total.value = res.data.data.total
  })
}
const show1=()=>{
  axios.get('/api/findAll').then((res) => {
    console.log('------------->>>',res.data)
    tableData.value = res.data.data.list
  })
}
//页面加载后自动加载数据
onMounted(() => {
  show()
})
</script>