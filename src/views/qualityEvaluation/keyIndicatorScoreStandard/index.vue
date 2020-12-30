<template>
  <div class="dataSource">
    <eform ref="form" :is-add="isAdd"></eform>
    <div class="head-container">
      <el-form class="query" :model="queryForm" label-width="auto" inline size="mini">
        <el-form-item label="关键指标分值标准">
          <el-input
        size="mini"
        v-model="queryForm.standard"
        clearable
        placeholder=""
        style="width: 160px;"
        class="filter-item"
      />
        </el-form-item>
        <!-- <el-form-item label="年份">
          <el-date-picker
            :editable="false"
            :clearable="false"
            v-model="queryForm.year"
            type="year"
            value-format="yyyy"
            placeholder
            style="width:100px"
          ></el-date-picker>
        </el-form-item> -->
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
        <el-form-item label="是否国航">
          <el-select
            v-model="queryForm.type"
            placeholder
            style="width:160px"
          >
            <el-option label="国航" value="0"></el-option>
            <el-option label="客户" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门">
          <department class="mini" :value="queryForm.deptPath" @change="deptChange" style="width:220px" />
        </el-form-item>
        <el-form-item label>
          <el-button type="success" icon="el-icon-search" @click="toQuery(queryForm)">搜索</el-button>
          <el-button class="filter-item" size="mini" type="success" icon="el-icon-plus" @click="add()">新增</el-button>
        </el-form-item>
      </el-form>
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
      <el-table-column type="index" width="50" :index="getIndex" />
      <el-table-column prop="standard" label="关键指标分值标准" width="200" />
      <el-table-column label="产品">
        <template slot-scope="{row}">{{renderTbCol(row)}}</template>
      </el-table-column>
      <el-table-column prop="year" label="年份" />
      <!-- <el-table-column prop="deptNameCn" label="部门" /> -->
      <el-table-column label="目标值">
        <template slot-scope="{row}">T{{row.evaluationLevel}}</template>
      </el-table-column>
      <el-table-column prop="score" label="量化分值" />
      <!-- <el-table-column prop="minIndexValue" label="最小年频次" />
      <el-table-column prop="maxIndexValue" label="最大年频次" /> -->
      <el-table-column prop="creater" label="创建人" />
      <el-table-column label="创建时间" width="140">
        <template slot-scope="{row}">{{format(row.createTime)}}</template>
      </el-table-column>
      <el-table-column label="是否启用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enable"
            active-value="1"
            inactive-value="0"
            @change="enableChange($event,scope.row.id)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130px" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)" />
          <el-button
            slot="reference"
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="subDelete(scope.row.id)"
          />
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
import eform from "./form";
import department from "@/components/Department";
import { format } from "@/utils/datetime";
import { detailEvaluationLevel, enableEvaluationLevel, deleteEvaluationLevel } from "@/api/quality";
import { queryDictByName } from '@/api/dict'
export default {
  name: 'KeyIndicatorScoreStandard',
  components: { eform, department },
  mixins: [initData],
  data() {
    return {
      isSuperAdmin: false,
      queryForm: {
        standard: '',
        productValue: undefined,
        type: undefined,
        deptPath: undefined,
      },
      prodList: [],
      userInfo: {},
      selections: []
    };
  },
  mounted() {
    this.init();
    this.loadData()
  },
  methods: {
    format,
    beforeInit() {
      this.url = `/quality_mgr/evaluationLevel/query/pageList/${this.page}/${this.size}`;
      this.params = { ...this.queryForm };
      return true;
    },
    toQuery(name) {
      this.page = 1;
      this.init();
    },
    // 选择切换
    selectionChange: function(selections) {
      this.selections = selections;
      this.$emit("selectionChange", { selections: selections });
    },
    add() {
      this.isAdd = true;
      this.loadData()
      this.$refs.form.dialog = true;
    },
    async edit(row) {
      this.isAdd = false;
      let _this = this.$refs.form;
      await this.loadData()
      detailEvaluationLevel(row.id).then(res => {
        if (res.code != "200") {
          this.$message.error(res.msg);
        } else {
          let { obj } = res;
          _this.form = {
            id: obj.id,
            deptPath: obj.deptPath,
            standard: obj.standard,
            productValue: obj.productValue,
            evaluationLevel: obj.evaluationLevel,
            score: obj.score,
            enable: obj.enable,
            type: obj.type,
            year: obj.year ? obj.year+'' : obj.year,
            minIndexValue: obj.minIndexValue ? obj.minIndexValue : undefined,
            maxIndexValue: obj.maxIndexValue ? obj.maxIndexValue : undefined
          };
          _this.dialog = true;
        }
      });
    },
    async loadData() {
      let _this = this.$refs.form;
      await queryDictByName("quality_product_index").then(res => {
        if (res.code != '200') {
          this.$message.error(res.msg);
        } else {
          if (!this.dialog) {
            this.prodList = res.obj[0].children;
          }
          _this.prodList = res.obj[0].children;
          _this.form.productValue = res.obj[0].children[0].value;
        }
      })
    },
    subDelete(id) {
      this.$confirm("确定删除嘛？")
        .then(() => {
          deleteEvaluationLevel(id).then(res => {
            if (res.code != "200") {
              this.$message.error(res.msg);
            } else {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.init();
            }
          });
        })
        .catch(() => {});
    },
    enableChange(val, id) {
      let editForm = {
        id,
        enable: val
      };
      enableEvaluationLevel(editForm).then(res => {
        if (res.code != "200") {
          this.$message.error(res.msg);
        } else this.$message.success("设置成功");
        this.init();
      });
    },
    renderTbCol(row) {
      if (row.productValue) {
        let productValue = "";
        switch (+row.productValue) {
          case 1: productValue = "定检产品"; break;
          case 2: productValue = "发动机/APU产品"; break;
          case 3: productValue = "附件产品"; break;
          case 4: productValue = "航线产品"; break;
          default: break;
        }
        return productValue;
      } else {
        return "";
      }
    },
    deptChange(val) {
      this.form.deptPath = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.dataSource {
  padding: 10px;
}
.filter-item {
  > .el-input__inner {
    height: 32px !important;
  }
}
.head-container {
  margin-bottom: 20px;
}
/deep/ .vue-treeselect--append-to-body {
  z-index: 99 !important;
}
</style>