<template>
  <div class="app-container">
    <div class="head-container">
      <el-form :model="queryForm" label-width="auto" inline size="mini">
        <el-form-item label="产品">
          <el-select v-model="queryForm.cc" placeholder="请选择产品" style="width: 110px;">
            <el-option
              v-for="item in option"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="质量评价表">
          <el-select v-model="queryForm.dd" placeholder style="width: 110px;">
            <el-option
              v-for="item in pList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-date-picker v-model="queryForm.aa" placeholder style="width: 130px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="截止日期">
          <el-date-picker v-model="queryForm.bb" placeholder style="width: 130px;"></el-date-picker>
        </el-form-item>
        <el-form-item label>
          <el-link
            class="filter-item"
            type="success"
            icon="el-icon-download"
            href="#/test"
            target="_blank"
            style="margin-left: 10px;"
          >生成质量评价报告</el-link>
        </el-form-item>
        <el-form-item label style="float:right">
          <el-button class="filter-item" type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row :gutter="8">
      <el-col :span="24">
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
          <!-- <el-table-column type="index" width="50" /> -->
          <el-table-column prop="nn" label width="110" />
          <el-table-column label="国航机队">
            <el-table-column label="全月定检出厂飞机第一个航班不正常数量之和">
              <template slot-scope="scope">
                <el-input v-model="scope.row.aa" placeholder></el-input>
              </template>
            </el-table-column>
            <el-table-column label="全月出厂飞机总计划工时">
              <template slot-scope="scope">
                <el-input v-model="scope.row.bb" placeholder></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="cc" label="定检出厂首班机械原因不正常万时率‱" />
          </el-table-column>
          <el-table-column label="客户机队">
            <el-table-column label="全月定检出厂飞机第一个航班不正常数量之和">
              <template slot-scope="scope">
                <el-input v-model="scope.row.dd" placeholder></el-input>
              </template>
            </el-table-column>
            <el-table-column label="全月出厂飞机总计划工时">
              <template slot-scope="scope">
                <el-input v-model="scope.row.ee" placeholder></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="ff" label="定检出厂首班机械原因不正常万时率‱" />
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import initData from "@/mixins/initData";
import { qualityEvaluate } from "@/dataSource";
export default {
  mixins: [initData],
  data() {
    return {
      isSuperAdmin: false,
      userInfo: {},
      selections: [],
      queryForm: {
        aa: "",
        bb: "",cc:"",dd:""
      },
      menu1: ["定检产品", "发动机APU产品", "附件产品", "航线产品"],
      menu2: [
        "出厂检发现问题万时率",
        "定检出厂首班机械原因不正常万时率",
        "定检出场一周机械原因不正常万时率",
        "客户满意度调查平均值",
        "客户质量投诉",
        "质量事件调查万时率"
      ],
      option: [
        { label: "定检产品", value: "1" },
        { label: "发动机APU产品", value: "2" },
        { label: "附件产品", value: "3" },
        { label: "航线产品", value: "4" }
      ],
      pList: [],
      totalList: [
        { label: "出厂检发现问题万时率", value: "1", pid: "1" },
        { label: "定检出厂首班机械原因不正常万时率", value: "2", pid: "1" },
        { label: "定检出场一周机械原因不正常万时率", value: "3", pid: "1" },
        { label: "客户满意度调查平均值", value: "4", pid: "1" },
        { label: "客户质量投诉", value: "5", pid: "1" },
        { label: "质量事件调查万时率", value: "6", pid: "1" },
        { label: "发动机APU基础数据", value: "7", pid: "2" },
        { label: "产品质量评价体系分项指标", value: "8", pid: "3" },
        { label: "附件产品质量评价数据2020优化版", value: "9", pid: "3" },
        { label: "航线不正常千次率", value: "10", pid: "4" },
        { label: "航线机组报告率", value: "11", pid: "4" },
        { label: "客户质量投诉万分率", value: "12", pid: "4" },
        { label: "质量事件调查万次率", value: "13", pid: "4" },
        { label: "重复故障率", value: "14", pid: "4" }
      ]
    };
  },
  watch: {
    "queryForm.cc": {
      handler(val) {
        if (val) {
          this.queryForm.dd = "";
          this.pList = this.totalList.filter(r => r.pid == val);
        }
      }
    },
    "queryForm.dd": {
      handler(val) {
        if (val) {
         console.log(val)
        }
      }
    }
  },
  mounted() {
    this.loading = false;
    this.data = [
      {
        nn: "北京基地",
        aa: "2",
        bb: "132189.00",
        cc: "0.15",
        dd: "1",
        ee: "102724.70",
        ff: "0.10"
      },
      {
        nn: "成都分公司",
        aa: "2",
        bb: "132189.00",
        cc: "0.15",
        dd: "1",
        ee: "102724.70",
        ff: "0.10"
      },
      {
        nn: "华北中心LN",
        aa: "2",
        bb: "132189.00",
        cc: "0.15",
        dd: "1",
        ee: "102724.70",
        ff: "0.10"
      },
      {
        nn: "西南航线中心LN",
        aa: "2",
        bb: "132189.00",
        cc: "0.15",
        dd: "1",
        ee: "102724.70",
        ff: "0.10"
      },
      {
        nn: "重庆分公司LWY",
        aa: "2",
        bb: "132189.00",
        cc: "0.15",
        dd: "1",
        ee: "102724.70",
        ff: "0.10"
      },
      {
        nn: "杭州分公司LWY",
        aa: "2",
        bb: "132189.00",
        cc: "0.15",
        dd: "1",
        ee: "102724.70",
        ff: "0.10"
      },
      {
        nn: "天津分公司LNJ",
        aa: "2",
        bb: "132189.00",
        cc: "0.15",
        dd: "1",
        ee: "102724.70",
        ff: "0.10"
      },
      {
        nn: "上海分公司LSS",
        aa: "2",
        bb: "132189.00",
        cc: "0.15",
        dd: "1",
        ee: "102724.70",
        ff: "0.10"
      },
      {
        nn: "呼和浩特分公司LNH",
        aa: "2",
        bb: "132189.00",
        cc: "0.15",
        dd: "1",
        ee: "102724.70",
        ff: "0.10"
      },
      {
        nn: "武汉分公司WUH",
        aa: "2",
        bb: "132189.00",
        cc: "0.15",
        dd: "1",
        ee: "102724.70",
        ff: "0.10"
      },
      {
        nn: "贵阳分公司LWG",
        aa: "2",
        bb: "132189.00",
        cc: "0.15",
        dd: "1",
        ee: "102724.70",
        ff: "0.10"
      }
    ];
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
// .head-container {
//   margin-bottom: 20px;
// }
.index-menu {
  min-height: calc(100vh - 140px);
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 0;
  .index-menu-item {
    padding: 10px 10px;
    text-align: left;
    margin: 0 0 10px;
    display: block;
    &.router-link-active {
      background: #324157;
      color: #fff;
    }
  }
}
.next-menu {
  min-height: calc(100vh - 140px);
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 0;
  .next-menu-item {
    padding: 10px 10px;
    text-align: left;
    margin-bottom: 10px;
    display: block;
    &.router-link-active {
      background: #324157;
      color: #fff;
    }
  }
}
.blue-btn {
  background: transparent;
  color: #000;
  border-radius: 0;
  // &:hover::before, &:hover:after{
  //   background: #0062ff;
  // }
}
/deep/ .scrollbar-wrapper {
  height: calc(100vh - 110px);
  padding-right: 10px;
}
</style>