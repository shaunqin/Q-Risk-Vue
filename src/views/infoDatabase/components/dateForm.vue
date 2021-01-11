<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    title="选择时间"
  >
    <el-date-picker
        v-model="date"
        type="daterange"
        value-format="yyyy-MM-dd"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        style="width:100%"
        unlink-panels
      ></el-date-picker>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { querySuperviseMgrList } from '@/api/data'
export default {
  data() {
    return {
      loading: false,
      dialog: false,
      queryForm: {},
      date: "",
    };
  },
  props: {
    dataType: {
      type: String,
      default: '4'
    }
  },
  watch: {
    date(val) {
      if (val) {
        this.queryForm.startTime = val[0];
        this.queryForm.endTime = val[1];
      } else {
        this.queryForm.startTime = "";
        this.queryForm.endTime = "";
      }
    },
  },
  methods: {
    cancel() {
      this.resetForm();
    },
    doSubmit() {
      if(!this.date) {
        this.$message.error("请选择时间！");
        return
      }
      querySuperviseMgrList({...this.queryForm, dataType: this.dataType}).then(res => {
        if (res.code != '200') {
          this.$message.error(res.msg);
        } else {
          this.$message.success(res.msg);
          this.resetForm();
        }
      })
    },
    resetForm() {
      this.dialog = false;
      this.date = "";
      this.queryForm = {};
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

