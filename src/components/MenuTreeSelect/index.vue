<template>
  <treeselect v-model="treeValue" :options="options" placeholder="请选择..." />
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { getMenuTree } from "@/api/auth";
export default {
  components: { Treeselect },
  data() {
    return {
      options: [],
    };
  },
  computed: {
    treeValue: {
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
  },
  mounted() {
    this.loadData();
  },
  methods: {
    getTree(tree) {
      let arr = [];
      if (tree.length !== 0) {
        tree.forEach((item) => {
          let obj = {};
          obj.label = item.name;
          obj.id = item.key;
          if (item.children.length > 0) {
            obj.children = this.getTree(item.children);
          }
          arr.push(obj);
        });
      }
      return arr;
    },
    loadData() {
      getMenuTree()
        .then((res) => {
          let result = [];
          result.push({
            id: "0",
            label: "顶级",
            children: this.getTree(res.obj),
          });
          this.options = result;
        })
        .catch((error) => {
          this.$message.error({
            type: "error",
            message: "获取菜单树异常",
          });
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>