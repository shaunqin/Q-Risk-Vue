<template>
  <div class="app-container">
    <eform ref="form" :is-add="isAdd"></eform>
    <!-- <div class="head-container">
      <el-button class="filter-item" size="mini" type="success">新开航站风险分析</el-button>
      <el-button class="filter-item" size="mini" type="success">新能力申请风险分析</el-button>
      <el-button class="filter-item" size="mini" type="success">其他专项风险分析</el-button>
    </div> -->
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
      <el-table-column prop="aa" label="份号" />
      <el-table-column prop="bb" label="主送单位" />
      <el-table-column prop="cc" label="抄送单位" />
      <el-table-column prop="dd" label="通知标题" />
      <el-table-column prop="ee" label="通知内容" />
      <el-table-column prop="ff" label="经办机构" />
      <el-table-column prop="gg" label="联系人" />
      <el-table-column prop="hh" label="电话" />
      <el-table-column prop="ii" label="编号" />
      <el-table-column prop="jj" label="主题" />
      <el-table-column prop="kk" label="适用范围" />
      <el-table-column prop="ll" label="背景" />
      <el-table-column prop="mm" label="存在的安全风险" />
      <el-table-column prop="nn" label="风险防范措施" />
      <el-table-column label="操作" width="150px" align="center" fixed="right">
        <template slot-scope="scope">
           <el-button
            :disabled="scope.row.userName !== userInfo.userName"
            size="mini"
            type="warning"
            @click="inputRisk(scope.row)"
          >填写</el-button>
          <el-button
            :disabled="scope.row.userName !== userInfo.userName"
            size="mini"
            type="success"
            @click="inputRisk(scope.row)"
          >确认</el-button>
          <!-- <el-button
            :disabled="scope.row.userName !== userInfo.userName"
            size="mini"
            type="primary"
            icon="el-icon-plus"
            @click="edit(scope.row)"
          >通知</el-button> -->
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
    <risk-input-dialog ref="riskInputDialog" />
  </div>
</template>

<script>
import initData from "@/mixins/initData";
import eform from "./form";
import riskInputDialog from './components/riskInputDialog'
export default {
  components: { eform,riskInputDialog },
  mixins: [initData],
  data() {
    return {
      isSuperAdmin: false,
      userInfo: {},
      selections: []
    };
  },
  mounted() {
    this.loading = false;
    for (let i = 0; i < 5; i++) {
      this.data.push({
        aa: "PM20200618-"+i,
        bb: "总部",
        cc: "北京分公司",
        dd: "这是通知标题",
        ee: "通知内容XXXXX",
        ff: "成都分公司",
        gg: "admin",
        hh: "1388888888",
        ii: "9527",
        jj: "飞机结构",
        kk: "全部",
        ll: "自定义背景",
        mm: "起落架安全风险",
        nn: "检查起落架",
      });
    }
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
    add() {
      this.isAdd = true;
      this.$refs.form.dialog = true;
    },
    edit(row) {
      this.isAdd = false;
      let _this = this.$refs.form;
      _this.form = Object.assign({}, row);
      _this.dialog = true;
    },
    subDelete(id) {
      this.$confirm("确定删除嘛？")
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    inputRisk(row){
      let _this=this.$refs.riskInputDialog;
      _this.dialog=true;
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