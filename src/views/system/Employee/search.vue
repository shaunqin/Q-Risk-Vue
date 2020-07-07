<template>
  <el-form :model="queryForm" size="mini" inline>
    <el-form-item label="生日" label-width="50px">
      <el-date-picker v-model="queryForm.birthday" value-format="yyyy-MM-dd" placeholder="出生年月" style="width:130px"></el-date-picker>
    </el-form-item>
    <el-form-item label="工号">
      <el-input v-model="queryForm.sqlUserId" placeholder="请输入工号" style="width:130px"></el-input>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="queryForm.realname" placeholder="请输入姓名" style="width:130px"></el-input>
    </el-form-item>
    <el-form-item label="超级管理员">
      <el-radio-group v-model="queryForm.isSysUser">
        <el-radio label="1">是</el-radio>
        <el-radio label="2">否</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      queryForm: { birthday: "", sqlUserId: "", realname: "", isSysUser: "" }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>