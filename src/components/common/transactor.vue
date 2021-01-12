<template>
  <el-table :data="data" :style="{width}" size="mini">
    <el-table-column label="任务名称" prop="taskName" />
    <el-table-column label="角色">
      <template slot-scope="{ row }">
        <span>{{ row.groupName||"-" }}</span>
      </template>
    </el-table-column>
    <el-table-column label="办理人">
      <template slot-scope="{row}">
        <span>{{row.name||row.users||"-"}}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    width: {
      type: String,
      default: '600px'
    }
  },
}
</script>

<style lang="scss" scoped>
</style>