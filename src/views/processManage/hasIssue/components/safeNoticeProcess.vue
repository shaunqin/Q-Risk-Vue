<template>
  <div>
    <el-tabs v-model="tabIndex">
      <el-tab-pane label="详情" name="1">
        <el-form ref="form" size="small" label-width="80px">
          <el-row :gutter="16">
            <el-col :span="12">
              <el-form-item label="编号">{{ data.no }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="拟制人">{{ data.issuerName }}[{{ data.issuer }}]</el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="适用范围">{{ data.applyScope }}</el-form-item>
          <el-form-item label="主题">{{ data.title }}</el-form-item>
          <el-form-item label="背景">
            <htmlContent :html="data.background" />
          </el-form-item>
          <el-form-item label="安全风险">
            <htmlContent :html="data.existingRisk" />
          </el-form-item>
          <el-form-item label="风险防范" v-if="data.measuresVos != null">
            <ul class="measuresVos">
              <li v-for="(item, index) in data.measuresVos" :key="index">{{ item.content }}</li>
            </ul>
          </el-form-item>
          <el-form-item label="附件">
            <ul class="measuresVos">
              <li v-for="(item, index) in files" :key="index">
                <el-link
                  type="primary"
                  :underline="false"
                  :href="baseApi + item.filePath"
                  target="_blank"
                >{{ item.originFileName }}</el-link>
              </li>
            </ul>
          </el-form-item>
          <el-form-item label="下发措施" v-if="data.firstLevelMeasure != null">
            <el-table
              v-loading="measureTbLoading"
              key="firstLevelMeasure"
              :data="data.firstLevelMeasure"
              size="mini"
              row-key="id"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              lazy
              :load="loadTree"
            >
              <el-table-column label="下发部门" prop="deptName" width="180" align="left" />
              <el-table-column label="截止日期" width="100">
                <template slot-scope="{ row }">{{ row.data.deadline }}</template>
              </el-table-column>
              <el-table-column label="措施内容" min-width="150">
                <template slot-scope="{ row }">{{ row.data.content }}</template>
              </el-table-column>
              <el-table-column label="落实情况" min-width="200" align="left">
                <template slot-scope="{ row }">
                  <span style="white-space: pre-wrap">{{ row.data.impl }}</span>
                </template>
              </el-table-column>
              <el-table-column label="下发人" width="120" prop="issuer" />
              <el-table-column label="上报人" width="120" prop="filler" />
              <el-table-column label="附件预览" min-width="120">
                <template slot-scope="{ row }">
                  <div v-for="(item, index) in row.data.files" :key="index">
                    <el-link
                      type="primary"
                      v-if="item != null"
                      :href="baseApi + item.filePath"
                      target="_blank"
                    >{{ item.originFileName }}</el-link>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="状态" width="80">
                <template slot-scope="{ row }">
                  <span v-if="row.status == 0">待填</span>
                  <span v-if="row.status == 1">待填</span>
                  <span v-if="row.status == 2">待审核</span>
                  <span v-if="row.status == 3">通过</span>
                  <span v-if="row.status == 4">驳回</span>
                  <span v-if="row.status == 5">已取消</span>
                </template>
              </el-table-column>
              <el-table-column label="办理人" width="80">
                <template slot-scope="{ row }">
                  <div v-if="row.reviewerInfo == null || row.reviewerInfo.length == 0">-</div>
                  <el-popover v-else placement="left">
                    <el-button type="text" size="mini" slot="reference">详情</el-button>
                    <transactor :data="row.reviewerInfo" />
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="审批记录" width="100">
                <template slot-scope="{ row }">
                  <div v-if="row.comments == null || row.comments.length == 0">-</div>
                  <el-popover v-else placement="left" width="600">
                    <el-button type="text" size="mini" slot="reference">详情</el-button>
                    <ApprvalRecord :data="row.comments" type="safety_measures" />
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100" fixed="right">
                <template slot-scope="{ row }">
                  <span v-if="row.status == '3' || row.status == '5'">-</span>
                  <el-button v-else type="primary" size="mini" @click="doHandle(row)">取消任务</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="处理记录" v-if="data.noticeComments && data.noticeComments.length > 0">
            <ApprvalRecord
              key="noticeComments"
              :data="data.noticeComments"
              type="safety_risk_notice"
            />
          </el-form-item>
          <el-form-item label="办理人" v-if="data.reviewerInfo!=null">
            <transactor :data="data.reviewerInfo" width="100%" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="流程图" name="2">
        <charts ref="charts" :chartData="chartData" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import htmlContent from "@/components/common/htmlContent";
import transactor from "@/components/common/transactor";
import ApprvalRecord from "./cptApprvalRecord";
import charts from '@/components/Charts'
import { riskNoticeLazyLoadIssueTree, riskNoticeLazyCancel, riskNoticeLazyProcessChart } from "@/api/process";
export default {
  components: {
    htmlContent, transactor, ApprvalRecord, charts
  },
  data() {
    return {
      baseApi: process.env.VUE_APP_BASE_API,
      tabIndex: "1",
      measureTbLoading: false,
      chartData: {}
    };
  },
  props: {
    data: {
      type: Object,
      default: () => { },
    },
  },
  computed: {
    files() {
      return this.data.files || [];
    },
    dialog() {
      return this.$parent.$parent.dialog
    }
  },
  watch: {
    tabIndex(val) {
      if (val == '2') {
        this.$refs.charts.resizeHandler();
        this.$refs.charts.chart.showLoading();
        riskNoticeLazyProcessChart(this.data.id).then(res => {
          if (res.code != '200') {
            this.$message.error(res.msg);
          } else {
            this.chartData = {
              tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
              },
              series: [
                {
                  type: 'tree',
                  data: [res.obj],
                  orient: 'TB',
                  symbolSize: 10,
                  label: {
                    position: 'top',
                    verticalAlign: 'middle',
                    align: 'center',
                    // fontSize: 9
                  },
                  leaves: {
                    label: {
                      position: 'bottom',
                      verticalAlign: 'middle',
                      align: 'center'
                    }
                  },
                  tooltip: {
                    formatter: '措施内容:{c}'
                  }
                }
              ]
            }
            this.$refs.charts.chart.hideLoading();
          }
        })
      }
    },
    dialog(val) {
      if (!val) {
        this.tabIndex = "1";
        this.chartData = {};
      }
    }
  },
  methods: {
    loadTree(tree, treeNode, resolve) {
      console.log(tree);
      riskNoticeLazyLoadIssueTree(tree.id).then((res) => {
        resolve(res.obj);
      });
    },
    doHandle(row) {
      this.$confirm("是否取消任务?", "提示", { type: "warning", }).then(() => {
        this.measureTbLoading = true;
        riskNoticeLazyCancel(row.id).then(res => {
          this.measureTbLoading = false;
          if (res.code != '200') {
            this.$message.error(res.msg);
          } else {
            this.$message.success("取消任务成功!");
            // 重置树形table
            this.data.firstLevelMeasure = null;
            this.$nextTick(() => {
              this.$parent.$parent.$parent.detail({ businessId: this.data.id, businessType: this.data.type })
            })
          }
        })
      }).catch(() => { })
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
/deep/ .el-table .el-table__expand-icon {
  margin-left: 0 !important;
}
</style>
