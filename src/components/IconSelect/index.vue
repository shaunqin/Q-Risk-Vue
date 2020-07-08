<template>
  <el-select
    v-model="iconValue"
    placeholder
    :popper-append-to-body="false"
    class="icon-select"
    style="width:100%"
  >
    <el-option v-for="item in iconList" :key="item" :value="item">
      <el-tooltip :content="item" placement="top">
        <svg-icon :icon-class="item"></svg-icon>
      </el-tooltip>
    </el-option>
    <template slot="prefix">
      <svg-icon :icon-class="iconValue"></svg-icon>
    </template>
  </el-select>
</template>

<script>
import iconList from "./svgIcon";
export default {
  data() {
    return {
      value1: "",
      iconList
    };
  },
  computed: {
    iconValue: {
      get() {
        return this.value || "";
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
    }
  }
};
</script>

<style lang="scss" scoped>
.icon-select {
  /deep/ .el-select-dropdown {
    width: 300px;
    .el-select-dropdown__item {
      display: inline-block;
      font-size: 16px;
    }
  }
}
</style>