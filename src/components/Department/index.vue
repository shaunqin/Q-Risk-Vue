<template>
  <treeselect
    v-model="selectValue"
    :options="options"
    :normalizer="normalizer"
    :default-expand-level="1"
    :disabled="disabled"
    placeholder="请选择..."
  />
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { queryDepartmentTree } from "@/api/emplotee";
export default {
  components: { Treeselect },
  data() {
    return {
      options: [],
      treeData: [],
    };
  },
  computed: {
    selectValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("change", val);
      },
    },
  },
  props: {
    value: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    queryDepartmentTree().then((res) => {
      this.options = res.obj;
    });
  },
  methods: {
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.key,
        label: node.name,
        children: node.children,
      };
    },
  },
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