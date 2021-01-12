<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    title="管控清单"
    custom-class="big_dialog"
  >
    <!--表格渲染-->
    <el-table :data="tbSource" size="small" style="width: 100%" max-height="400px">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="no" label="编号" width="120px" />
      <el-table-column prop="hiddenName" label="隐患名称" width="120px" show-overflow-tooltip />
      <el-table-column label="发现时间" width="100px">
        <template slot-scope="{row}">{{formatShortString(row.findTime)}}</template>
      </el-table-column>
      <el-table-column prop="sourceName" label="来源" />
      <el-table-column prop="typeName" label="类型" />
      <el-table-column prop="levelsName" label="等级" />
      <el-table-column prop="deptName" label="主体单位/部门" width="120px" show-overflow-tooltip />
      <el-table-column prop="businessName" label="涉及业务" width="100px" />
      <el-table-column prop="processName" label="涉及流程" width="100px" />
      <el-table-column prop="supervisoryUnit" label="监管单位" width="120px" show-overflow-tooltip />
      <el-table-column prop="reasonAnalysis" label="原因分析" width="120px" show-overflow-tooltip />
      <el-table-column prop="equivalentMeasures" label="等效措施" width="160px" show-overflow-tooltip />
      <el-table-column label="整改措施" width="150px">
        <template slot-scope="{ row }" show-overflow-tooltip>
          <ul class="tab-ul">
            <li v-for="item in row.controlList" :key="item.id">
              <el-popover trigger="hover" v-if="true" placement="top">
                <span>{{item.measures}}</span>
                <div class="text" slot="reference">{{item.measures}}</div>
              </el-popover>
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="责任人" width="150px">
        <template slot-scope="{ row }">
          <ul class="tab-ul">
            <li v-for="item in row.controlList" :key="item.id">{{ item.responsiblePerson }}</li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="整改时限" width="120px">
        <template slot-scope="{ row }">
          <ul class="tab-ul">
            <li v-for="item in row.controlList" :key="item.id">{{ formatShortString(item.deadline) }}</li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="治理结果情况跟踪" width="160px">
        <template slot-scope="{ row }">
          <ul class="tab-ul">
            <li v-for="item in row.controlList" :key="item.id">
              <el-popover trigger="hover" v-if="true" placement="top">
                <span>{{item.governanceResults}}</span>
                <div class="text" slot="reference">{{item.governanceResults}}</div>
              </el-popover>
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="措施实施情况跟踪" width="160px">
        <template slot-scope="{ row }">
          <ul class="tab-ul">
            <li v-for="item in row.controlList" :key="item.id">
              <el-popover trigger="hover" v-if="true" placement="top">
                <span>{{item.implementationOfMeasures}}</span>
                <div class="text" slot="reference">{{item.implementationOfMeasures}}</div>
              </el-popover>
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column
        prop="verificationFollowUp"
        label="治理效果情况跟踪"
        width="140px"
        show-overflow-tooltip
      />
      <el-table-column
        prop="rectificationProgress"
        label="整改进展"
        width="120px"
        show-overflow-tooltip
      />
      <el-table-column prop="remarks" label="备注" width="120px" show-overflow-tooltip />
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { formatShortString } from '@/utils/datetime'
export default {
  data() {
    return {
      loading: false,
      dialog: false,
      tbSource: [],
      selections: []
    };
  },
  props: {
    readonly: {
      type: Boolean,
      default: false
    }
  },
  created() {
  },
  methods: {
    formatShortString,
    cancel() {
      this.resetForm();
    },
    resetForm() {
      this.dialog = false;
      this.selections = [];
    },
    selectionChange(selection) {
      this.selections = selection;
    }
  },
};
</script>


<style lang="scss" scope>
.tab-ul {
  list-style: decimal;
  text-align: left;
  padding-inline-start: 20px;
}
</style>
