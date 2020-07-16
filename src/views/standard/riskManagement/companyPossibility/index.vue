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
      <el-table-column prop="standard" label="界定标准" />
      <el-table-column prop="deptNameCn" label="部门" />
      <el-table-column label="风险等级">
        <template slot-scope="{row}">{{row.riskLevel}}级</template>
      </el-table-column>
      <el-table-column prop="score" label="量化分值" />
      <el-table-column prop="minFrequenceEveryYear" label="最小年频次" />
      <el-table-column prop="maxFrequenceEveryYear" label="最大年频次" />
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
import { format } from "@/utils/datetime";
import { detailRiskLevel, modifyRiskLevel, delRiskLevel } from "@/api/standard";
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
    format,
    beforeInit() {
      this.url = `/info_mgr/riskLevel_mgr/query/pageList/${this.page}/${this.size}`;
      this.params = { type: 1, unitType: 1, standard: this.query };
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
      this.$refs.form.dialog = true;
    },
    edit(row) {
      this.isAdd = false;
      let _this = this.$refs.form;
      detailRiskLevel(row.id).then(res => {
        if (res.code != "200") {
          this.$message.error(res.msg);
        } else {
          let { obj } = res;
          _this.form = {
            id: obj.id,
            deptPath: obj.deptPath,
            standard: obj.standard,
            riskLevel: obj.riskLevel,
            score: obj.score,
            enable: obj.enable,
            type: obj.type,
            minFrequenceEveryYear: obj.minFrequenceEveryYear,
            maxFrequenceEveryYear: obj.maxFrequenceEveryYear
          };
          _this.dialog = true;
        }
      });
    },
    subDelete(id) {
      this.$confirm("确定删除嘛？")
        .then(() => {
          delRiskLevel(id).then(res => {
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
      modifyRiskLevel(editForm).then(res => {
        if (res.code != "200") {
          this.$message.error(res.msg);
        } else this.$message.success("设置成功");
        this.init();
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
.head-container {
  margin-bottom: 20px;
}
</style>