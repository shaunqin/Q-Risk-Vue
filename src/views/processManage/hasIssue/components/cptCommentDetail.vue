<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    :title="'详情'"
    custom-class="big_dialog"
  >
    <el-form
      ref="form"
      :model="form"
      size="small"
      label-width="80px"
      v-if="type=='safety_risk_notice'"
    >
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="编号">{{form.no}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="拟制人">{{form.issuerName}}[{{form.issuer}}]</el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="适用范围">{{form.applyScope}}</el-form-item>
      <el-form-item label="主题">{{form.title}}</el-form-item>
      <el-form-item label="背景">
        <htmlContent :html="form.background" />
      </el-form-item>
      <el-form-item label="安全风险">
        <htmlContent :html="form.existingRisk" />
      </el-form-item>
      <el-form-item label="风险防范" v-if="form.measuresVos!=null">
        <ul class="measuresVos">
          <li v-for="(item,index) in form.measuresVos" :key="index">{{item.content}}</li>
        </ul>
      </el-form-item>
    </el-form>
    <el-form v-if="type=='safety_measures'" size="mini" label-width="80px">
      <el-form-item label="落实情况">
        <span style="white-space: pre-wrap;">{{form.implementStatus}}</span>
      </el-form-item>
      <el-form-item label="附件">
        <template v-if="form.accessory ? form.accessory.length!=0 : false">
          <div v-for="(item, index) in form.accessory" :key="index">
            <el-link
              type="primary"
              :href="getUrl(item.filePath)"
              target="_blank"
            >{{item.originFileName}}</el-link>
          </div>
        </template>
        <span v-else>未上传附件</span>
      </el-form-item>
    </el-form>

    <div v-if="type=='hiddenDange'">
      <el-card>
        <p class="title">
          <b>{{form.controlListName}}</b>
        </p>
        <el-form ref="titleForm" size="mini" inline>
          <el-form-item label="填表人">
            <span class="readonly">{{form.fillerName}}</span>
          </el-form-item>
          <el-form-item label="填表日期">
            <span class="readonly">{{formatShortString(form.fillDate)}}</span>
          </el-form-item>
          <el-form-item label="批准人" v-if="!!form.approverName">
            <span class="readonly">{{form.approverName}}</span>
          </el-form-item>
          <el-form-item label="批准日期" v-if="!!form.approveDate">
            <span class="readonly">{{formatShortString(form.approveDate)}}</span>
          </el-form-item>
        </el-form>
        <!-- 填报 -->
        <el-card
          style="margin-bottom: 20px"
          v-for="(item, index) in form.hiddenDangerControlList"
          :key="index"
        >
          <el-form class="baseinfo" ref="form" size="mini" inline label-width="80px" label-position="left">
            <el-row class="fill-row">
              <el-col :span="24">
                <el-form-item label="隐患名称">{{item.hiddenName}}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="16" class="fill-row">
              <el-col :span="6">
                <el-form-item label="编号">{{item.no}}</el-form-item>
                <el-form-item label="等级">{{item.levelsName}}</el-form-item>
                <el-form-item label="整改进展">{{item.rectificationProgress}}</el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="发现时间">{{item.findTime}}</el-form-item>
                <el-form-item label="涉及业务">{{item.businessName}}</el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="来源">{{item.sourceName}}</el-form-item>
                <el-form-item label="涉及流程">{{item.processName}}</el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="类型">{{item.typeName}}</el-form-item>
                <el-form-item label="监管单位">{{item.supervisoryUnit}}</el-form-item>
              </el-col>
            </el-row>
            <el-row class="fill-row" :gutter="16">
              <el-col :span="24">
                <el-form-item label="原因分析">{{item.reasonAnalysis}}</el-form-item>
                <el-form-item label="治理效果验证标准" label-width="130px">{{item.verificationFollowUp}}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="等效措施">{{item.equivalentMeasures}}</el-form-item>
                <el-form-item label="备注">{{item.remarks}}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!--表格渲染-->
          <el-table :data="item.controlList" size="small" style="width: 100%" max-height="400px">
            <el-table-column type="index" width="50" />
            <el-table-column label="整改措施" prop="measures" />
            <el-table-column label="责任人" prop="responsiblePerson" />
            <el-table-column label="整改时限" prop="deadline" />
            <el-table-column label="措施实施情况跟踪" prop="implementationOfMeasures" />
            <el-table-column label="治理结果情况跟踪" prop="governanceResults" />
          </el-table>
        </el-card>
      </el-card>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import htmlContent from '@/components/common/htmlContent'
import { formatShortString } from '@/utils/datetime'
export default {
  components: {
    htmlContent
  },
  data() {
    return {
      loading: false,
      dialog: false,
      form: {},
    };
  },
  props: ["type"],
  methods: {
    formatShortString,
    getUrl(url) {
      return process.env.VUE_APP_BASE_API + url;
    },
    cancel() {
      this.resetForm();
    },
    doSubmit() {
      this.resetForm();
    },
    resetForm() {
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.measuresVos {
  margin: 0;
  list-style-type: decimal;
  padding-inline-start: 20px;
}
.title {
  text-align: center;
  font-size: 18px;
  margin-top: 0;
}
.readonly {
  width: 150px;
  display: inline-block;
}
.fill-row {
  /deep/ .el-form-item {
    display: flex;
    .el-form-item__content {
      flex: 1;
    }
  }
}
.el-card + .el-card {
  margin-top: 20px;
}
.baseinfo{
  /deep/ .el-form-item{
    margin-bottom: 4px;
  }
}
</style>

