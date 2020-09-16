<template>
  <el-select
    clearable
    v-model="_value"
    placeholder
    style="width: 100%;"
  >
    <el-option
      v-for="item in riskLevel2List"
      :key="item.key"
      :label="item.name"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: [],
    },
    riskLevel1: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
  },
  computed: {
    _value: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("change", val);
      },
    },
    riskLevel2List() {
      if (this.list.length > 0) {
        let _list = this.list.filter((r) => r.value == this.riskLevel1);
        if (_list && _list.length > 0) {
          return _list[0].children;
        }
      }
      return [];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>