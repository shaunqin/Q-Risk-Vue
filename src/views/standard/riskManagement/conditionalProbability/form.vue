<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    :title="isAdd ? '新增数据来源' : '编辑数据来源'"
  >
    <el-form ref="form" :model="form" :rules="formRules" size="small" label-width="100px">
      <el-form-item label="危险源">
        <el-select
          v-model="form.diskId"
          placeholder="请选择危险源"
          filterable
          popper-class="disk-select"
          style="width:100%"
        >
          <el-option
            v-for="item in diskList"
            :key="item.diskId"
            :label="item.diskDesc"
            :value="item.diskId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关联后果">
        <el-input-number v-model="form.relatedResult" />
      </el-form-item>
      <el-form-item label="关联信息">
        <el-input-number v-model="form.relatedInformation" />
      </el-form-item>
      <el-form-item label="条件概率">
        <el-input-number v-model="form.conditionalProbability" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  queryHazardList,
  addProbability,
  modifyProbability
} from "@/api/standard";

export default {
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        diskId: "",
        relatedResult: 0,
        relatedInformation: 0,
        conditionalProbability: 0
      },
      diskList: [],
      formRules: {
        aa: [{ required: true, message: "请填写名称", trigger: "blur" }],
        bb: [{ required: true, message: "请填写名称", trigger: "blur" }]
      },
      entArr: []
    };
  },
  props: {
    isAdd: {
      type: Boolean,
      required: true
    }
  },
  created() {
    queryHazardList().then(res => {
      if (res.code == "200") {
        res.obj.map(item => {
          this.diskList.push({
            diskId: item.diskId,
            diskDesc: item.diskDesc
          });
        });
      }
    });
  },
  methods: {
    cancel() {
      this.resetForm();
    },
    doSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.isAdd) {
            this.doAdd();
          } else this.doModify();
        }
      });
    },
    doAdd() {
      addProbability(this.form)
        .then(res => {
          if (res.code === "200") {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.resetForm();
            this.loading = false;
            this.$parent.init();
          } else {
            this.$message.error(res.msg);
            this.loading = false;
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    doModify() {
      modifyProbability(this.form)
        .then(res => {
          if (res.code === "200") {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.resetForm();
            this.loading = false;
            this.$parent.init();
          } else {
            this.$message.error(res.msg);
            this.loading = false;
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        diskId: "",
        relatedResult: 0,
        relatedInformation: 0,
        conditionalProbability: 0
      };
    }
  }
};
</script>


<style lang="scss" scope>
.roleSelect {
  width: 370px;
}
.el-select-dropdown {
  z-index: 99999999999999 !important;
}
.disk-select {
  width: 400px;
}
</style>
