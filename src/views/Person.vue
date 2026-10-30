<template>
  <el-form
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="用户名称">
      <el-input v-model="ruleForm.username" />
    </el-form-item>
    <el-form-item label="性别">
      <el-select
      v-model="ruleForm.sex"
      placeholder="Select"
      size="large"
      style="width: 240px"
    >
      <el-option label="男" value="男"/>
      <el-option label="女" value="女"/>
    </el-select>
    </el-form-item>
    <el-form-item label="年龄">
      <el-input-number v-model="ruleForm.age" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm()">
        {{ ruleForm ?.id ?'修改' : '添加' }}
      </el-button>
      <el-button @click="resetForm()">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref,onMounted } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import axios from 'axios';
import { ElMessage } from 'element-plus'
import {useRouter} from 'vue-router'

//接口定义
interface RuleForm {
  username: string
  sex: string
  age: number
}

//页面加载后获取回填数据
onMounted(() => {
  let result = history.state.params
  if (result) {
    let person = JSON.parse(result)//将json字符串转换为对象
    Object.assign(ruleForm, person)
  }
})

//创建路由器
const router = useRouter()

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
//表单数据
const ruleForm = reactive<RuleForm>({
  username: '',
  sex: '男',
  age: 1,
})

//规则定义
const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '请填写姓名', trigger: 'blur' }
  ],
})

//保存数据
const saveForm = () => {
  axios.post('/api/save', ruleForm).then(res => {
    ElMessage({
      message: '添加成功.',
      type: 'success',
    })
    router.push('/')
  })
}
//修改数据
const updateForm = () => {
  axios.post('/api/update', ruleForm).then(res => {
    ElMessage({
      message: '修改成功.',
      type: 'success',
    })
    router.push('/')
  })
}

const submitForm = () => {
  if (ruleForm.id) {
    updateForm()
  } else {
    saveForm()
  }
}

const resetForm = () => {
  router.push('/')
}
</script>