<template>
  <treeselect
    v-model="selectValue"
    :options="options"
    :normalizer="normalizer"
    :disabled="disabled"
  />
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { getDictTree } from "@/api/dict";
export default {
  components: { Treeselect },
  data() {
    return {
      options: [],
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
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  created() {
    getDictTree().then(res => {
      this.options = res.obj;
    });
  },
  methods: {
    nodeClick(data, node, item) {
      this.name = data.name;
      this.selectValue = data.key;
    },
    normalizer(node) {
      return {
        id: node.key,
        label: node.name,
        children: node.children
      };
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