<template>
  <div class="dashboard-editor-container" style="text-align:center">
    <el-card>
      <h1>welcome to Q - Risk</h1>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DashboardEditor',
  data() {
    return {
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }

  .dashboard-editor-container {
    background-color: #e3e3e3;
    min-height: calc(100vh - 84px);
    padding: 50px 60px 0px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
    .el-card {
      height: 100% !important;
      box-sizing: border-box;
      background-color: #0db5db;
      background-image: linear-gradient(141deg,#9fb8ad 0%, #46b8db 51%, #498fe8 75%);
      opacity: .7;
      text-align: center;
      color: #f3f3f3;
      font-size: 36px;
      font-weight: 600;
      padding: 20vh 100px;
    }
  }
</style>
