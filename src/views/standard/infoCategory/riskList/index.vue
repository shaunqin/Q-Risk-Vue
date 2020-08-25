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
      <el-checkbox
        border
        size="mini"
        v-model="enable"
        :true-label="1"
        :false-label="0"
        class="ck"
      >启用</el-checkbox>
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
      <el-table-column prop="riskNo" label="编号" />
      <el-table-column prop="riskName" label="名称" />
      <el-table-column prop="riskDesc" label="描述" min-width="200px" />
      <el-table-column prop="levelDesc" label="等级描述" />
      <el-table-column label="是否启用" width="120px">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enable"
            :active-value="1"
            :inactive-value="0"
            @change="enableChange($event,scope.row.riskListId)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130px" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="edit(scope.row.riskListId)"
          />
          <el-button
            slot="reference"
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="subDelete(scope.row.riskListId)"
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
import { queryRiskDetail, delRisk, enableRisk } from "@/api/standard";
export default {
  components: { eform },
  mixins: [initData],
  data() {
    return {
      isSuperAdmin: false,
      userInfo: {},
      selections: [],
      enable: 0
    };
  },
  // watch: {
  //   enable(val){
  //     if(val){
  //       this.params.enable=val;
  //     }else{
  //       this.params.enable=val;
  //     }
  //   }
  // },
  mounted() {
    this.init();
  },
  methods: {
    beforeInit() {
      this.url = `/info_mgr/riskList_mgr/query/pageList/${this.page}/${this.size}`;
      return true;
    },
    toQuery(name) {
      this.page = 1;
      if (!name) this.params = {};
      else this.params = { riskName: name };
      if (this.enable) this.params.enable = this.enable;
      else delete this.params.enable;
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
    edit(id) {
      this.isAdd = false;
      let _this = this.$refs.form;
      queryRiskDetail(id).then(res => {
        if (res.code != "200") {
          this.$message.error(res.msg);
        } else {
          let { obj } = res;
          _this.form = {
            riskListId: obj.id,
            riskNo: obj.riskNo,
            riskName: obj.riskName,
            riskDesc: obj.riskDesc,
            levels: obj.levels,
            enable: obj.enable,
            isKey: obj.isKey
          };
          _this.dialog = true;
        }
      });
    },
    subDelete(id) {
      this.$confirm("确定删除嘛？")
        .then(() => {
          delRisk(id).then(res => {
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
      let modelForm = {
        id,
        enable: val
      };
      enableRisk(modelForm).then(res => {
        if (res.code != "200") {
          this.$message.error(res.msg);
        } else {
          this.$message({
            type: "success",
            message: "更新成功!"
          });
        }
        this.init();
      }).catch(err=>{
        this.$message.error('系统异常');
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
.ck {
  margin: 0 15px;
  top: -2px;
}
</style>
