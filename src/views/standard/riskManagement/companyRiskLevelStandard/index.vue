<template>
  <div>
    <eform ref="form" :is-add="isAdd"></eform>
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
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-plus" @click="add">新增</el-button>
    </div>
    <!--表格渲染-->
    <el-table
      v-loading="loading"
      :data="data"
      size="small"
      :stripe="true"
      :highlight-current-row="true"
      style="width: 100%;"
    >
      <el-table-column prop="standardLevel" label="等级" />
      <el-table-column prop="deptNameCn" label="部门" />
      <el-table-column prop="color" label="颜色">
        <template slot-scope="{row}">
          <span class="color-item" :style="'background-color:'+row.color"></span>
        </template>
      </el-table-column>
      <el-table-column prop="minRiskValue" label="最小风险值" />
      <el-table-column prop="maxRiskValue" label="最大风险值" />
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
import { detailRiskLevelStandard, delRiskLevelStandard } from "@/api/standard";
export default {
  components: { eform },
  mixins: [initData],
  data() {
    return {
      form: {
        color1: "",
        value1: ""
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    beforeInit() {
      this.url = `/info_mgr/risk_value_standard_mgr/query/pageList/${this.page}/${this.size}`;
      this.params.unitType = 1;
      return true;
    },
    toQuery(name) {
      this.params.standardLevel = name;
      this.page = 1;
      this.init();
    },
    add() {
      this.isAdd = true;
      this.$refs.form.dialog = true;
    },
    edit(row) {
      this.isAdd = false;
      let _this = this.$refs.form;
      detailRiskLevelStandard(row.id).then(res => {
        if (res.code == "200") {
          let { obj } = res;
          _this.form = {
            id: obj.id,
            deptPath: obj.deptPath,
            standardLevel: obj.standardLevel,
            color: obj.color,
            minRiskValue: obj.minRiskValue,
            maxRiskValue: obj.maxRiskValue
          };
          _this.dialog = true;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    subDelete(id) {
      this.$confirm("确定删除嘛？")
        .then(() => {
          delRiskLevelStandard(id).then(res => {
            if (res.code == "200") {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.init();
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.color-item {
  width: 80px;
  height: 22px;
  display: inline-block;
  border: 1px solid #ccc;
}
.head-container {
  margin-bottom: 20px;
}
</style>