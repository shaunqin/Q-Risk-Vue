<template>
  <div class="app-container">
    <eform ref="form" :is-add="isAdd" />

    <div class="head-container">
      <search ref="search" />
      <el-button
        class="filter-item"
        size="mini"
        type="success"
        icon="el-icon-search"
        @click="toQuery"
      >搜索</el-button>
      <!-- <el-button class="filter-item" size="mini" icon="el-icon-refresh" @click="refresh">重置</el-button> -->

      <el-button type="success" size="mini" icon="el-icon-plus" @click="add">新增</el-button>
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
      <el-table-column type="index" width="50" />
      <el-table-column prop="yearType" label="是否按年度">
        <template slot-scope="{row}">
          {{ +row.yearType ? '是' : '否'}}
        </template>
      </el-table-column>
      <el-table-column prop="includeCurrentMonth" label="是否包含当前月">
        <template slot-scope="{row}">
          {{ +row.includeCurrentMonth ? '是' : '否'}}
        </template>
      </el-table-column>
      <el-table-column prop="dateLength" label="月份长度">
      </el-table-column>
      <el-table-column label="是否启用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enable"
            active-value="1"
            inactive-value="0"
            @change="enableChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" />
      <el-table-column label="操作" width="130px" align="center" fixed="right">
        <template slot-scope="{row}">
          <el-button :disabled="true" type="primary" size="mini" icon="el-icon-edit" @click="edit(row.id)"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="subDelete(row.id)"></el-button>
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
import { format } from "@/utils/datetime";
import eform from "./form";
import { deleteCountStandard, queryCountStandardDetail, modifyCountStandard } from "@/api/quality";
import search from "./search";
export default {
  name: "CalculationStandard",
  components: { eform, search },
  mixins: [initData],
  data() {
    return {
      delLoading: false,
      selectId: [], // 列表选中列
      queryForm: null,
    };
  },
  created() {
    this.$nextTick(() => {
      this.init();
    });
  },
  beforeRouteLeave: function (to, from, next) {
    if (to.path === this.toPath) {
      return;
    }
    const _this = this.$refs.form;
    _this.dialog = false;
    next();
  },
  methods: {
    format,
    beforeInit() {
      this.url = `/quality_mgr/countStandard/query/pageList/${this.page}/${this.size}`;
      if (this.queryForm != null) {
        this.params = { ...this.queryForm };
      }
      return true;
    },
    subDelete(id) {
      this.delLoading = true;
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteCountStandard(id)
          .then((res) => {
            if (res.code === "200") {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.delLoading = false;
              this.dleChangePage();
              this.init();
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((err) => {
            console.log(err);
            this.delLoading = false;
          });
      });
    },
    refresh() {
      let _this = this.$refs.search;
      _this.$refs.form.resetFields();
      _this.queryForm = {
        yearType: "",
        includeCurrentMonth: "",
        dateLength: "",
        enable: ""
      };
      this.queryForm = _this.queryForm;
      this.init();
    },
    add() {
      this.isAdd = true;
      this.$refs.form.dialog = true;
    },
    edit(id) {
      this.isAdd = false;
      const _this = this.$refs.form;
      queryCountStandardDetail(id).then((res) => {
        if (res.code === "200") {
          _this.form = {
            id: res.obj.id,
            yearType: res.obj.yearType,
            includeCurrentMonth: res.obj.includeCurrentMonth,
            dateLength: res.obj.dateLength,
            enable: res.obj.enable,
            remark: res.obj.remark
          };
          _this.dialog = true;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 选择切换
    selectionChange: function (selections) {
      let arr = [];
      selections.map((item) => {
        arr.push(item.setId);
      });
      this.selectId = arr;
    },
    toQuery() {
      let _this = this.$refs.search;
      this.queryForm = _this.queryForm;
      this.page = 1;
      this.init();
    },
    enableChange(row) {
      modifyCountStandard(row).then(res => {
        if (res.code == "200") this.$message.success("设置成功!");
        else this.$message.error(res.msg || "系统错误");
        this.init();
      });
    }
  },
};
</script>

<style lang="scss" scope>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 70px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
.demo-table-expand .el-form-item__content {
  font-size: 12px;
}
.filter-item {
  > .el-input__inner {
    height: 32px !important;
  }
}
// .head-container {
//   margin-bottom: 20px;
// }
</style>
