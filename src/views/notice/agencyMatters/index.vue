<template>
  <div class="app-container">
    <detail ref="detail"></detail>
    <feedback ref="feedback"></feedback>
    <approval-dialog ref="approvalDialog"></approval-dialog>
    <hairdown-dialog ref="hairdownDialog"></hairdown-dialog>
    <div class="head-container">
      <el-input
        size="mini"
        v-model="query"
        clearable
        placeholder="请输入你要搜索的内容"
        style="width: 200px;"
        class="filter-item"
      />
      <el-button
        class="filter-item"
        size="mini"
        type="success"
        icon="el-icon-search"
        @click="toQuery(query)"
      >搜索</el-button>
    </div>
    <!--表格渲染-->
    <el-table
      v-loading="loading"
      :data="data"
      size="small"
      :stripe="true"
      :highlight-current-row="true"
      style="width: 100%;"
      @selection-change="selectionChange"
    >
      <el-table-column type="index" width="50" />
      <el-table-column prop="aa" label="单据号" />
      <el-table-column prop="bb" label="任务名称" />
      <el-table-column prop="dd" label="发起时间-截至时间" />
      <el-table-column prop="cc" label="类型" />
      <el-table-column label="操作" width="130px" align="left" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.cc=='安全风险提示'"
            size="mini"
            type="text"
            @click="xiafa(scope.row)"
          >下发</el-button>
          <el-button
            v-if="scope.row.cc=='安全风险提示'"
            size="mini"
            type="text"
            @click="fillin(scope.row)"
          >填报</el-button>
          <el-button
            v-if="scope.row.cc=='安全风险提示'"
            size="mini"
            type="text"
            @click="shenpi(scope.row)"
          >审批</el-button>
          <el-button
            v-if="scope.row.cc=='专项风险评估'"
            size="mini"
            type="text"
            @click="feedback(scope.row)"
          >反馈</el-button>
          <el-button v-if="scope.row.cc=='隐患排查'" size="mini" type="text">待定</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      :current-page="page"
      style="margin-top: 8px;text-align: right"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"
    />
  </div>
</template>

<script>
import initData from "@/mixins/initData";
import detail from "../components/detail";
import feedback from "../components/feedback";
import approvalDialog from "../components/approvalDialog";
import hairdownDialog from "../components/hairdownDialog";
export default {
  components: { detail, feedback, approvalDialog, hairdownDialog },
  mixins: [initData],
  data() {
    return {
      isSuperAdmin: false,
      userInfo: {},
      selections: []
    };
  },
  // created () {
  //   this.$nextTick(()=>{
  //     this.init()
  //   });
  // },
  mounted() {
    this.loading = false;
    this.data = [
      {
        aa: "123456",
        bb: "测试内容111",
        cc: "安全风险提示",
        dd: "2020/06/01 - 2020/06/30"
      },
      {
        aa: "156325",
        bb: "测试内容222",
        cc: "专项风险评估",
        dd: "2020/06/01 - 2020/06/30"
      },
      {
        aa: "961258",
        bb: "测试内容333",
        cc: "隐患排查",
        dd: "2020/06/01 - 2020/06/30"
      }
    ];
  },
  methods: {
    beforeInit() {
      this.url = "/notice/list";
      return true;
    },
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
    jumpdetail(row) {
      let url = "";
      switch (row.cc) {
        case "风险清单":
          url = "/dangerEvaluate/riskListManager/riskListAccept";
          break;
        case "风险措施":
          url = "/dangerEvaluate/riskMeasureReport/riskMeasureConfirm";
          break;
        case "实施结果":
          url =
            "/dangerEvaluate/implementationResultsReport/riskImplementationConfirm";
          break;
      }
      return url;
    },
    detail(row) {
      // let _this = this.$refs.detail;
      // _this.dialog = true;
    },
    fillin(row) {
      let _this = this.$refs.detail;
      _this.form = row;
      _this.title = "填报";
      _this.dialog = true;
    },
    shenpi(row) {
      let _this = this.$refs.approvalDialog;
      _this.title = "审批";
      _this.form = row;
      _this.dialog = true;
    },
    xiafa(row) {
      let _this = this.$refs.hairdownDialog;
      _this.title = "下发";
      _this.form = row;
      _this.dialog = true;
    },
    feedback(row) {
      let _this = this.$refs.feedback;
      _this.title = "反馈";
      _this.form = {
        aa: "重复故障影响飞机安全运行的风险提示",
        bb: `2020 年 6 月 5 日，A321/B-1833 飞机执行 CA1948 航班，成都起
飞后地面监控出现 AIR R WING LEAK 警告信息，飞机返航，该机 5
月 3 日曾出现相同的故障信息，并造成飞机返航。 
自 2020 年以来，A320 系列飞机曾多次发生大翼引气渗漏故
障，给航班的安全正常运行带来了一定的影响。 `,
        cc: `飞机在运行过程中出现大翼引气渗漏等重复性故障后，存在返
航、备降、中断起飞的安全风险`
      };
      _this.dialog = true;
      _this.data = [
        {
          aa: "杭州",
          bb: `认真做好重复性故障的管控工作。各单位要高度重视飞机出
现的重复性故障，加强对排故力量的组织...`,
          cc: ""
        },
        {
          aa: "上海",
          bb: `严格飞机航后和飞机定检维修质量。维修人员要严格按工作
单卡执行飞机航后检查工作，及时发现并处理飞机故障，... `,
          cc: ""
        }
      ];
    }
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