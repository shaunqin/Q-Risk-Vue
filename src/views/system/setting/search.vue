<template>
  <el-form ref="form" :model="queryForm" size="mini" inline>
    <el-form-item label="名称">
      <el-input v-model="queryForm.setName" placeholder="请输入务名称" style="width:130px"></el-input>
    </el-form-item>
    <el-form-item label="编号">
      <el-input v-model="queryForm.setObjectName" placeholder="请输入编号" style="width:130px"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      queryForm: { setName: "", setObjectName: "" },
    };
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  display: inline;
}
</style>