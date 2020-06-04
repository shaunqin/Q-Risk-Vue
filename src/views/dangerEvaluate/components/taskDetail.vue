<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>任务详情</span>
    </div>
    <el-row>
      <el-col :span="8">
        <p>
          <span>监察单编号:</span>
          <span>TA20200527868</span>
        </p>
        <p>
          <span>开始日期:</span>
          <span></span>
        </p>
        <p>
          <span>制定人:</span>
          <span>胡子铮</span>
        </p>
        <p>
          <span>任务内容:</span>
          <span>收到</span>
        </p>
      </el-col>
      <el-col :span="8">
        <p>
          <span>任务名称:</span>
          <span>退回测试</span>
        </p>
        <p>
          <span>截止日期:</span>
          <span>2020-05-28 23:59:59.0</span>
        </p>
        <p>
          <span>代表部门:</span>
          <span>成都分公司</span>
        </p>
      </el-col>
      <el-col :span="8">
        <p>
          <span>检查业务类型:</span>
          <span>附件修理</span>
        </p>
        <p>
          <span>单据类型:</span>
          <span>无检查单</span>
        </p>
        <p>
          <span>周期:</span>
          <span>一周</span>
        </p>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.box-card {
  p {
    margin-bottom: 8px;
  }
}
</style>