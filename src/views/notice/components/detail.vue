<template>
  <el-dialog :title="title" :append-to-body="true" :close-on-click-modal="false" :visible.sync="dialog">
    <el-form :model="form">
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="单据号">
            <el-input v-model="form.aa" placeholder="" readonly ></el-input>
          </el-form-item>
           <el-form-item label="任务名称">
            <el-input v-model="form.bb" placeholder="" readonly ></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="起止时间">
            <el-input v-model="form.dd" placeholder="" readonly ></el-input>
          </el-form-item>
           <el-form-item label="类型">
            <el-input v-model="form.cc" placeholder="" readonly ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="title=='审批'">
           <el-form-item label="审批">
            <el-input v-model="shenpi" placeholder="" type="textarea" rows="4" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="title=='下发'">
           <el-form-item label="下发">
           <el-select v-model="xiafa" placeholder="请选择部门" style="width:100%">
             <el-option :label="'请选择部门'" :value="'请选择部门'"></el-option>
           </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">关闭</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      title:"",
      dialog: false,
      form: {
        aa: "",
        bb: "",
        cc: "",dd:""
      },
      shenpi:"",
      xiafa:""
    };
  },
  methods: {
    cancel() {
      this.dialog = false;
    },
    submit(){
      this.dialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>