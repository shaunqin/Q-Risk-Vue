<template>
  <el-dropdown trigger="click" placement="bottom-start" v-if="!disabled">
    <span class="el-dropdown-link">
      {{name}}
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu style="width:320px">
      <el-scrollbar class="scroll-container">
        <el-tree
          :data="treeData"
          :props="{label:'name'}"
          node-key="key"
          :default-expanded-keys="['000003']"
          :expand-on-click-node="false"
          @node-click="nodeClick"
          :current-node-key="selectValue"
        ></el-tree>
      </el-scrollbar>
    </el-dropdown-menu>
  </el-dropdown>
  <el-button v-else type="text" disabled>{{text}} <i class="el-icon-arrow-down el-icon--right"></i></el-button>
</template>

<script>
import { queryDepartmentTree } from "@/api/emplotee";
export default {
  data() {
    return {
      option: [
        { label: "总部", value: "总部" },
        { label: "分部", value: "分部" }
      ],
      treeData: [],
      name: "请选择部门"
    };
  },
  computed: {
    selectValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("change", val);
      }
    }
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ""
    },
  },
  created() {
    queryDepartmentTree().then(res => {
      this.treeData = res.obj;
    });
  },
  methods: {
    nodeClick(data, node, item) {
      this.name = data.name;
      this.selectValue = data.key;
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll-container {
  height: 400px;
  /deep/ .el-scrollbar__wrap {
    overflow-x: auto;
  }
}
</style>