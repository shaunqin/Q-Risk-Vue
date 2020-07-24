<template>
  <el-select filterable multiple v-model="_value" placeholder style="width: 100%;">
    <!-- id作为key -->
    <el-option
      v-for="item in list"
      :key="item.riskListId"
      :label="item.riskName"
      :value="item.riskListId"
    ></el-option>
  </el-select>
</template>

<script>
import { queryRiskList } from "@/api/standard";
export default {
  data() {
    return {
      list: [],
    };
  },
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  computed: {
    _value: {
      get() {
        return !this.value ? [] : this.value.split(",");
      },
      set(val) {
        this.$emit("change", val);
      },
    },
  },
  created() {
    queryRiskList().then((res) => {
      if (res.code != "200") {
        this.$message.error(res.msg);
      } else {
        this.list = res.obj;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
</style>