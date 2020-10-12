<template>
  <el-form :model="queryForm" size="mini" inline class="search-form">
    <el-form-item label="部门">
      <department :value="queryForm.deptPath" @change="change" style="width:300px" />
    </el-form-item>
    <el-form-item label="名称">
      <el-input v-model="queryForm.roleDesc" placeholder="请输入工号" style="width:130px"></el-input>
    </el-form-item>
    <el-form-item label="编号">
      <el-input v-model="queryForm.code" placeholder="请输入姓名" style="width:130px"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import department from "@/components/Department";
export default {
  components: { department },
  data() {
    return {
      queryForm: { deptPath: null, roleDesc: "", code: "" }
    };
  },
  methods: {
    change(val) {
      this.queryForm.deptPath = val;
      console.log(val);
    }
  }
};
</script>

<style lang="scss" scoped>
.search-form{
  display: inline;
}
/deep/ .vue-treeselect{
  .vue-treeselect__control{
    height: 28px;
    .vue-treeselect__single-value,.vue-treeselect__placeholder{
      line-height: 28px;
    }
  }
}
.vue-treeselect--append-to-body {
  z-index: 1 !important;
}
</style>