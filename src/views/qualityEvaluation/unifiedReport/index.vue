<template>
  <div class="app-container">
    <div class="head-container">
      <el-form class="query" :model="queryForm" label-width="auto" inline size="mini">
        <el-form-item label="年份">
          <el-date-picker
            :editable="false"
            :clearable="false"
            v-model="queryForm.year"
            type="year"
            value-format="yyyy"
            placeholder
            style="width:100px"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="月份">
          <el-select v-model="queryForm.month" placeholder style="width:80px;">
            <el-option v-for="num in 12" :key="num" :label="num" :value="num"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门">
          <department class="mini" :value="queryForm.departmentPath" @change="deptChange" style="width:180px;" />
        </el-form-item>
        <el-form-item label="产品">
          <el-select
            v-model="queryForm.productValue"
            placeholder
            style="width:160px"
          >
            <el-option
              v-for="item in prodList"
              :key="item.key"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label>
          <el-button type="success" icon="el-icon-search" @click="toQuery(queryForm)">搜索</el-button>
          <el-button type="success" icon="el-icon-check" @click="changeData()">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-col :span="24">
        <!--表格渲染-->
        <el-table
          v-loading="loading"
          :data="data"
          size="small"
          :stripe="true"
          :highlight-current-row="true"
          style="width: 100%;"
        >
          <el-table-column v-for="(column,index) in columns" :key="column.name+index" :label="column.name" :prop="column.prop ? column.prop : null">
              <el-table-column
                v-for="(item,iindex) in column.children"
                :key="iindex"
                :label="item.name"
              >
                <template slot-scope="{row}">
                  <span v-if="item.prop!=='generalNumData1' && item.prop!=='generalNumData2' && item.  prop!=='generalTimeData1' && item.prop!=='generalTimeData2'">{{row[item.prop]}}</span>
                  <el-input v-else v-model="row[item.prop]" placeholder></el-input>
                </template>
              </el-table-column>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import department from '@/components/Department';
import { queryDictByName } from '@/api/dict'
import { queryMonthTaskNoPageListe, fillMonthGeneralData } from '@/api/quality'
export default {
  components: { department },
  data() {
    return {
      isSuperAdmin: false,
      userInfo: {},
      selections: [],
      queryForm: {
        type: 2,
        year: new Date().getFullYear().toString(),
        month: 1,
        departmentPath: null,
        productValue: ""
      },
      prodList: [],
      loading: false,
      data: [],
      columns: [
        { "name": "部门", "prop": "departmentName" },
        {
          "name": "国航机队",
          "children": [
            { "name": "月度任务通用数量", "prop": "generalNumData1" },
            { "name": "月度任务通用时长", "prop": "generalTimeData1" }]
        },
        {
          "name": "客户机队",
          "children": [
            { "name": "月度任务通用数量", "prop": "generalNumData2" },
            { "name": "月度任务通用时长", "prop": "generalTimeData2" }]
        }],
    };
  },
  computed: {
    indexList() {
      if (this.queryForm.productValue != "") {
        return this.prodList.find(r => r.value == this.queryForm.productValue).children;
      }
      return []
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    toQuery(name) {
      this.loading = true;
      queryMonthTaskNoPageListe(this.queryForm).then(res => {
        this.loading = false;
        if (res.code != '200') {
          this.$message.error(res.msg);
        } else {
          this.data = res.obj;
        }
      })
    },
    changeData() {
      const obj = {
	      fillData: {},
	      fillInDate: new Date().getTime()
      }
      this.data.map(item => {
        if(item.generalNumData1 || item.generalNumData2 || item.generalTimeData1 || item.generalTimeData20) {
          obj.fillData[item.monthTaskId] = {
            generalNumData1: item.generalNumData1,
            generalNumData2: item.generalNumData2,
            generalTimeData1: item.generalTimeData1,
            generalTimeData2: item.generalTimeData2
          }
        }
      })
      fillMonthGeneralData(obj).then(res => {
        this.$message.success('填报成功！！')
        this.toQuery()
      })
    },
    loadData() {
      queryDictByName("quality_product_index").then(res => {
        if (res.code != '200') {
          this.$message.error(res.msg);
        } else {
          this.prodList = res.obj[0].children;
          // 默认值
          this.queryForm.productValue = res.obj[0].children[0].value;
        }
      })
    },
    deptChange(val) {
      this.queryForm.departmentPath = val;
    },
    renderTbCol(row) {
      if (row.departmentName) {
        return row.departmentName
      } else if (row.month) {
        let month = "";
        switch (row.month) {
          case 1: month = "一月"; break;
          case 2: month = "二月"; break;
          case 3: month = "三月"; break;
          case 4: month = "四月"; break;
          case 5: month = "五月"; break;
          case 6: month = "六月"; break;
          case 7: month = "七月"; break;
          case 8: month = "八月"; break;
          case 9: month = "九月"; break;
          case 10: month = "十月"; break;
          case 11: month = "十一月"; break;
          case 12: month = "十二月"; break;
          default: break;
        }
        return month;
      } else {
        return "一月至十二月";
      }
    },
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