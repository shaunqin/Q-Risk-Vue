<template>
  <div class="dataSource">
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
      @selection-change="selectionChange"
    >
      <el-table-column type="index" width="50" :index="getIndex" />
      <el-table-column prop="diskId" label="编号" />
      <el-table-column prop="diskDesc" label="危险源" min-width="200px" />
      <el-table-column prop="relatedResult" label="关联后果" />
      <el-table-column prop="relatedInformation" label="关联信息" />
      <el-table-column prop="count" label="信息总数" />
      <el-table-column prop="conditionalProbability" label="条件概率" />
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
import { conditionalProbability } from "@/dataSource";
import { detailProbability, delProbability } from "@/api/standard";
export default {
  components: { eform },
  mixins: [initData],
  data() {
    return {
      isSuperAdmin: false,
      userInfo: {},
      selections: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    beforeInit() {
      this.url = `/info_mgr/probability_mgr/query/pageList/${this.page}/${this.size}`;
      return true;
    },
    toQuery(name) {
      this.params = { diskDesc: name };
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
      this.$refs.form.dialog = true;
    },
    edit(row) {
      this.isAdd = false;
      let _this = this.$refs.form;
      detailProbability(row.id).then(res => {
        let { obj } = res;
        if (res.code == "200") {
          _this.form = {
            id: obj.id,
            diskId: obj.diskId,
            relatedResult: obj.relatedResult,
            relatedInformation: obj.relatedInformation,
            conditionalProbability: obj.conditionalProbability
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
          delProbability(id).then(res => {
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
.filter-item {
  > .el-input__inner {
    height: 32px !important;
  }
}
.head-container {
  margin-bottom: 20px;
}
</style>