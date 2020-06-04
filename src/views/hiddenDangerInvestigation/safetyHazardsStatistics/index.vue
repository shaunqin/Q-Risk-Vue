<template>
  <div class="app-container">
    <div class="head-container"></div>
    <el-row>
      <el-col :span="12">
        <echarts :chartData="chartData" width="100%" />
      </el-col>
      <el-col :span="12">
        <echarts :chartData="chartData" width="100%" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import initData from "@/mixins/initData";
import echarts from "@/components/Charts/index";
export default {
  components: { echarts },
  mixins: [initData],
  data() {
    return {
      isSuperAdmin: false,
      userInfo: {},
      selections: []
    };
  },
  computed: {
    chartData() {
      return {
        series: [
          {
            name: "访问来源",
            type: "pie", // 设置图表类型为饼图
            radius: "55%", // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            data: [
              // 数据数组，name 为数据项名称，value 为数据项值
              { value: 235, name: "视频广告" },
              { value: 274, name: "联盟广告" },
              { value: 310, name: "邮件营销" },
              { value: 335, name: "直接访问" },
              { value: 400, name: "搜索引擎" }
            ]
          }
        ]
      };
    }
  },
  mounted() {
    this.loading = false;
  },
  methods: {
    toQuery(name) {
      if (!name) {
        this.page = 1;
        this.init();
        return;
      }
    },
    // 选择切换
    selectionChange: function(selections) {
      this.selections = selections;
      this.$emit("selectionChange", { selections: selections });
    },
    add() {},
    edit() {},
    subDelete() {}
  }
};
</script>

<style lang="scss" scoped>
.filter-item {
  > .el-input__inner {
    height: 32px !important;
  }
}
.head-container {
  margin-bottom: 20px;
}
</style>