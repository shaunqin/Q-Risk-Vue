<template>
  <el-select filterable multiple v-model="_value" placeholder style="width: 100%;">
    <!-- id作为key -->
    <el-option
      v-for="item in list"
      :key="item.id"
      :label="item.diskName"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
import { queryIncentiveList } from "@/api/standard";
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
    queryIncentiveList().then((res) => {
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