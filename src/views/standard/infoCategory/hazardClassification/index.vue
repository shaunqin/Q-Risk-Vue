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
      <el-table-column type="index" width="50" />
      <el-table-column prop="cateValue" label="编号" width="60" />
      <el-table-column prop="category2" label="危险源层级" />
      <el-table-column prop="diskNo" label="编号" width="60" />
      <el-table-column prop="diskName" label="危险源" min-width="140" show-overflow-tooltip />
      <el-table-column prop="diskDesc" label="描述" min-width="260" show-overflow-tooltip />
      <!-- <el-table-column label="诱因">
        <template slot-scope="{row}">
          <div v-if="row.incentives&&row.incentives.length>0">
            <span
              v-for="item in row.incentives"
              :key="item.diskId"
              style="margin-right:10px"
            >{{item.diskNo}}</span>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column label="风险">
        <template slot-scope="{row}">
          <div v-if="row.diskRiskVos&&row.diskRiskVos.length>0">
            <span
              v-for="item in row.diskRiskVos"
              :key="item.riskId"
              style="margin-right:10px"
            >{{item.riskNo}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否启用" width="80px">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enable"
            :active-value="1"
            :inactive-value="0"
            @change="enableChange($event,scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130px" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)" />
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="subDelete(scope.row.diskId)"
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
import { delHazard, modifyHazard, detailHazard } from "@/api/standard";
export default {
  components: { eform },
  mixins: [initData],
  data() {
    return {
      isSuperAdmin: false,
      userInfo: {},
      selections: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    beforeInit() {
      this.url = `/info_mgr/hazard_mgr/query/pageList/${this.page}/${this.size}`;
      return true;
    },
    toQuery(name) {
      this.params = { diskDesc: name };
      this.init();
    },
    // 选择切换
    selectionChange: function (selections) {
      this.selections = selections;
      this.$emit("selectionChange", { selections: selections });
    },
    add() {
      this.isAdd = true;
      this.$refs.form.dialog = true;
    },
    edit(row) {
      detailHazard(row.diskId).then((res) => {
        if (res.code != "200") {
          this.$message.error(res.msg);
        } else {
          this.isAdd = false;
          let _this = this.$refs.form;
          _this.form = res.obj;
          if (res.obj.incentives && res.obj.incentives.length > 0) {
            _this.selectIncentives = res.obj.incentives.map((r) => r.diskId);
          }
          if (res.obj.diskRiskVos && res.obj.diskRiskVos.length > 0) {
            _this.selectRisks = res.obj.diskRiskVos.map((r) => r.riskId);
          }
          _this.dialog = true;
        }
      });
    },
    subDelete(id) {
      this.$confirm("确定删除嘛？")
        .then(() => {
          delHazard(id).then((res) => {
            if (res.code == "200") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.init();
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {});
    },
    enableChange(val, row) {
      let editForm = {
        diskId: row.diskId,
        enable: val,
      };
      modifyHazard(editForm).then((res) => {
        if (res.code == "200") {
          this.$message.success("设置成功");
        } else {
          this.$message.error(res.msg);
        }
        this.init();
      });
    },
  },
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
