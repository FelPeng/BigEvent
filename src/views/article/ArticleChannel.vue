<script setup>
import { artGetChannelsService, artDelChannelService } from '@/api/article.js'
import ChannelEdit from './components/ChannelEdit.vue'

import { onMounted, ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'

// 文章分类列表
const channelList = ref([])
// loading控制
const loading = ref(false)
// 弹出框
const dialog = ref()

// 获取文章分类

const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  loading.value = false
}

// 修改与删除按钮
const onEditChannel = (row) => {
  dialog.value.open(row)
}
const onDelChannel = async (row) => {
  await ElMessageBox.confirm('你确认删除该分类信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelChannelService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  getChannelList()
}
const onAddChannel = () => {
  dialog.value.open({})
}
const onSuccess = () => {
  getChannelList()
}

onMounted(() => {
  // 文章分类
  getChannelList()
})
</script>
<template>
  <page-container title="文章分类">
    <template #extra
      ><el-button type="primary" @click="onAddChannel"
        >添加分类</el-button
      ></template
    >

    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </page-container>
</template>
