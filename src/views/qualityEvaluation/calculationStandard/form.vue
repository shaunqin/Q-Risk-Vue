<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    :title="isAdd ? '新增' : '编辑'"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="formRules"
      size="small"
      label-width="120px"
    >
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="是否按年度" prop="yearType">
            <el-select v-model="form.yearType" placeholder="请输入是否按年度">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否包含当前月" prop="includeCurrentMonth">
            <el-select
              v-model="form.includeCurrentMonth"
              placeholder="请选择是否包含当前月"
            >
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="月份长度" prop="dateLength">
            <el-input-number
              v-model="form.dateLength"
              controls-position="right"
              :min="1"
              :max="9999"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否启用" prop="enable">
              <el-switch
                v-model="form.enable"
                active-value="1"
                inactive-value="0"
              />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit"
        >确认</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { addCountStandard, modifyCountStandard } from '@/api/quality'

export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        remark: '',
        yearType: '',
        includeCurrentMonth: '',
        dateLength: '',
        enable: 0,
      },
      formRules: {
        yearType: [{ required: true, message: '是否按年度不能为空', trigger: 'blur' }],
        dateLength: [{ required: true, message: '月份长度不能为空', trigger: 'blur' }],
        includeCurrentMonth: [
          {
            required: true,
            message: '是否包含当前月不能为空',
            trigger: 'blur',
          },
        ],
      },
      entArr: [],
    }
  },
  created() {},
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.isAdd) {
            this.doAdd()
          } else this.doModify()
        }
      })
    },
    doAdd() {
      addCountStandard(this.form)
        .then((res) => {
          if (res.code === '200') {
            this.$message({
              message: '添加成功',
              type: 'success',
            })
            this.resetForm()
            this.$parent.init()
          } else {
            this.$message.error(res.msg)
          }
          this.loading = false
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    doModify() {
      modifyCountStandard(this.form)
        .then((res) => {
          if (res.code === '200') {
            this.$message({
              message: '修改成功',
              type: 'success',
            })
            this.resetForm()
            this.loading = false
            this.$parent.init()
          } else {
            this.$message.error(res.msg)
            this.loading = false
          }
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        remark: '',
        yearType: '',
        includeCurrentMonth: '',
        dateLength: '',
        enable: '',
      }
    },
  },
}
</script>

<style scoped>
</style>

<style lang="scss">
.roleSelect {
  width: 370px;
}
.el-select-dropdown {
  z-index: 99999999999999 !important;
}
</style>
