<template>
  <div>
    <el-table :data="data" size="mini">
      <el-table-column label="批复人">
        <template slot-scope="{row}">{{row.name}}[{{row.sqlUserId}}]</template>
      </el-table-column>
      <el-table-column label="批复时间">
        <template slot-scope="{row}">{{format(row.createTime)}}</template>
      </el-table-column>
      <el-table-column label="批复结果">
        <template slot-scope="{row}">
          <span v-if="row.processFlag=='1'">同意</span>
          <span v-else>驳回</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remark" />
      <el-table-column width="80" label="操作">
        <template slot-scope="{row}">
          <el-button type="text" size="mini" @click="commentsDetail(row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <commentDetail ref="commentDetail" :type="type" />
  </div>
</template>

<script>
import commentDetail from './cptCommentDetail';
import { getOriginFormByCommentId, hiddenDangerGetOriginFormByCommentId } from "@/api/process";
import { format } from '@/utils/datetime'
export default {
  components: { commentDetail },
  props: ["data", "type"],// type:safety_risk_notice,safety_measures,hiddenDange
  methods: {
    format,
    commentsDetail(row) {
      let params = {
        formId: row.id,
        formName: row.formName
      };
      switch (this.type) {
        case 'safety_risk_notice':
        case 'safety_measures': this.riskOriginForm(params); break;
        case 'hiddenDange': this.hiddenDangeOriginForm(params); break;
        default: break;
      }
    },
    riskOriginForm(params) {
      getOriginFormByCommentId(params).then(res => {
        if (res.code != '200') {
          this.$message.error(res.msg);
        } else {
          if (res.obj != null) {
            let _this = this.$refs.commentDetail;
            _this.form = res.obj;
            _this.dialog = true;
          } else {
            this.$message("无历史版本!")
          }
        }
      })
    },
    hiddenDangeOriginForm(params) {
      hiddenDangerGetOriginFormByCommentId(params).then(res => {
        if (res.code != '200') {
          this.$message.error(res.msg);
        } else {
          if (res.obj != null) {
            let _this = this.$refs.commentDetail;
            _this.form = res.obj;
            _this.dialog = true;
          } else {
            this.$message("无历史版本!")
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>