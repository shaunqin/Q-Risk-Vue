<template>
  <div class="dataSource">
    <eform ref="form" :is-add="isAdd" :data="options"></eform>
    <div class="head-container">
      <el-select v-model="query" size="mini" clearable placeholder="请选择产品">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
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
      @selection-change="selectionChange"
    >
      <el-table-column type="index" width="50" :index="getIndex" />
      <el-table-column prop="system" label="系统名称" />
      <el-table-column prop="diskSystemDesc" label="备注" />
      <el-table-column prop="product" label="所属产品" />
      <el-table-column label="是否启用" width="120px">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enable"
            active-value="1"
            inactive-value="0"
            @change="enableChange($event,scope.row)"
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
            @click="subDelete(scope.row.diskSystemId)"
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
import { queryDictByName } from "@/api/dict";
import { queryProdDetail, delProd, modifyProd } from "@/api/standard";
export default {
  components: { eform },
  mixins: [initData],
  data() {
    return {
      isSuperAdmin: false,
      userInfo: {},
      selections: [],
      options: []
    };
  },
  created() {
    this.getProductList();
    this.init();
  },
  methods: {
    beforeInit() {
      this.url = `/info_mgr/prod_mgr/query/pageList/${this.page}/${this.size}`;
      return true;
    },
    toQuery(name) {
      this.page = 1;
      if (!name) this.params = {};
      else this.params = { productId: name };
      this.init();
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
      queryProdDetail(row.diskSystemId).then(res => {
        _this.form = res.obj;
        _this.dialog = true;
      });
    },
    subDelete(id) {
      this.$confirm("确定删除嘛？")
        .then(() => {
          delProd(id).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.init();
          });
        })
        .catch(() => {});
    },
    getProductList() {
      queryDictByName("product").then(res => {
        res.obj[0].children.map(item => {
          this.options.push({
            label: item.name,
            value: item.value
          });
        });
      });
    },
    enableChange(val, row) {
      let modelForm = {};
      queryProdDetail(row.diskSystemId).then(res => {
        modelForm = res.obj;
        modelForm.enable = val;
        modifyProd(modelForm).then(res2 => {
          this.$message({
            message: "更新成功",
            type: "success"
          });
        });
      });
    },
    getIndex(index) {
      return (this.page - 1) * this.size + index + 1;
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
