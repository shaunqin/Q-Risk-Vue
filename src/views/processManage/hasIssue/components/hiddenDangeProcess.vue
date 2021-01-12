<template>
  <div>
    <el-tabs v-model="tabIndex">
      <el-tab-pane label="详情" name="1">
        <el-form size="mini" label-width="80px">
          <el-row :gutter="16">
            <el-col :span="14">
              <el-form-item label="任务名称">{{ data.taskName }}</el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="类型">
                <span v-if="data.yearTask">年度任务</span>
                <span v-else>单次任务</span>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="截止日期">{{ formatShortString(data.dueDate) }}</el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="附件">
            <ul class="measuresVos">
              <li v-for="(item, index) in data.files || []" :key="index">
                <el-link
                  type="primary"
                  :underline="false"
                  :href="baseApi + item.filePath"
                  target="_blank"
                >{{ item.originFileName }}</el-link>
              </li>
            </ul>
          </el-form-item>
          <el-form-item label="下发任务" v-if="data.treeData!=null">
            <el-table
              v-loading="tbLoading"
              :data="[data.treeData]"
              size="mini"
              row-key="id"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              lazy
              :load="loadTree"
              style="width:100%"
            >
              <el-table-column label="下发部门" prop="deptName" width="180" align="left" />
              <el-table-column label="下发人" prop="issuer" />
              <el-table-column label="上报人" prop="filler" />
              <el-table-column label="上报日期" prop="fillerDate" />
              <el-table-column label="状态">
                <template slot-scope="{ row }">
                  <span v-if="row.status == 2">待填报</span>
                  <span v-if="row.status == 3">待填报</span>
                  <span v-if="row.status == 4">待审核</span>
                  <span v-if="row.status == 5">通过</span>
                  <span v-if="row.status == 6">驳回</span>
                  <span v-if="row.status == 7">已取消</span>
                </template>
              </el-table-column>
              <el-table-column label="管控清单" width="100">
                <template slot-scope="{ row }">
                  <span v-if="row.status==2 || row.status==3">-</span>
                  <el-button v-else type="info" size="mini" @click="showList(row)">查看</el-button>
                </template>
              </el-table-column>
              <el-table-column label="办理人">
                <template slot-scope="{ row }">
                  <div v-if="row.reviewerInfo == null || row.reviewerInfo.length == 0">-</div>
                  <el-popover v-else placement="left">
                    <el-button type="text" size="mini" slot="reference">详情</el-button>
                    <transactor :data="row.reviewerInfo" />
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="审批记录">
                <template slot-scope="{ row }">
                  <div v-if="row.comments == null || row.comments.length == 0">-</div>
                  <el-popover v-else placement="left" width="600">
                    <el-button type="text" size="mini" slot="reference">详情</el-button>
                    <ApprvalRecord :data="row.comments" type="hiddenDange" />
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100" fixed="right">
                <template slot-scope="{ row }">
                  <span v-if="row.status == '5' || row.status == '7'">-</span>
                  <el-button v-else type="primary" size="mini" @click="doHandle(row)">取消任务</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="流程图" name="2">
        <charts ref="charts" :chartData="chartData" />
      </el-tab-pane>
    </el-tabs>
    <ControlList ref="ControlList" />
  </div>
</template>

<script>
import { formatShortString } from "@/utils/datetime";
import transactor from '@/components/common/transactor'
import ApprvalRecord from './cptApprvalRecord'
import ControlList from './cptControlList'
import { hiddenDangerCancel, hiddenDangerSubIssueTreeData, hiddenDangerLazyProcessChart, queryControlListDetail } from '@/api/process';
import charts from '@/components/Charts'
export default {
  components: {
    transactor, ApprvalRecord, charts, ControlList
  },
  data() {
    return {
      baseApi: process.env.VUE_APP_BASE_API,
      tbLoading: false,
      tabIndex: "1",
      chartData: {}
    }
  },
  props: {
    data: {
      type: Object,
      default: () => { },
    },
  },
  computed: {
    dialog() {
      return this.$parent.$parent.dialog
    }
  },
  watch: {
    tabIndex(val) {
      if (val == '2') {
        this.$refs.charts.resizeHandler();
        this.$refs.charts.chart.showLoading();
        hiddenDangerLazyProcessChart(this.data.id).then(res => {
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
    formatShortString,
    loadTree(tree, treeNode, resolve) {
      console.log(tree);
      hiddenDangerSubIssueTreeData(tree.id).then((res) => {
        resolve(res.obj);
      });
    },
    doHandle(row) {
      this.$confirm("是否取消任务?", "提示", { type: "warning", }).then(() => {
        this.tbLoading = true;
        hiddenDangerCancel(row.id).then(res => {
          this.tbLoading = false;
          if (res.code != '200') {
            this.$message.error(res.msg);
          } else {
            this.$message.success("取消任务成功!");
            // 重置树形table
            this.data.treeData = null;
            this.$nextTick(() => {
              this.$parent.$parent.$parent.detail({ businessId: this.data.id, businessType: this.data.type })
            })
          }
        })
      }).catch(() => { })
    },
    showList(row) {
      queryControlListDetail(row.id).then((res) => {
        if (res.code != "200") {
          this.$message.error(res.msg);
        } else {
          let _this = this.$refs.ControlList;
          _this.tbSource = res.obj.hiddenDangerControlList;
          _this.dialog = true;
        }
      });
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
