<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    :title="isAdd ? '新增产品系统' : '编辑产品系统'"
    custom-class="big_dialog"
  >
    <el-form ref="form" :model="form" :rules="formRules" size="small" label-width="100px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="所属产品" prop="productId">
            <el-select
              v-model="form.productId"
              size="mini"
              clearable
              placeholder="请选择产品"
              style="width: 100%;"
            >
              <el-option
                v-for="item in data"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="系统名称" prop="systemId">
            <el-select
              v-model="form.systemId"
              size="mini"
              clearable
              placeholder="请选择系统"
              style="width: 100%;"
            >
              <el-option
                v-for="item in systemList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.diskSystemDesc" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="启用">
            <el-radio-group v-model="form.enable">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addProd, modifyProd } from "@/api/standard";
import { re } from "../../../../utils/config-re";
import { queryDictByName } from "@/api/dict";
export default {
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        systemId: "",
        diskSystemDesc: "",
        productId: "",
        enable: ""
      },
      formRules: {
        systemId: [
          { required: true, message: "系统名称不能为空", trigger: "blur" }
        ],
        productId: [{ required: true, message: "产品不能为空", trigger: "blur" }]
      },
      entArr: [],
      systemList: []
    };
  },
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  created() {
    this.getSystemList();
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
      addProd(this.form)
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
      modifyProd(this.form)
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
        systemId: "",
        diskSystemDesc: "",
        productId: "",
        enable: ""
      };
    },
    getSystemList() {
      queryDictByName("system").then(res => {
        res.obj[0].children.map(item => {
          this.systemList.push({
            label: item.name,
            value: item.value
          });
        });
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.roleSelect {
  width: 370px;
}
.el-select-dropdown {
  z-index: 99999999999999 !important;
}
</style>
