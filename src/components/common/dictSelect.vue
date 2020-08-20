<template>
  <el-select clearable v-model="_value" :placeholder="placeholder" style="width: 100%;">
    <!-- id作为key -->
    <el-option
      v-for="item in list"
      :key="item.key"
      :label="item.name"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script>
import { queryDictByName } from "@/api/dict";
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
    type: {
      type: String,
      default: "",
    },
    placeholder: {
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
  },
  mounted() {
    queryDictByName(this.type).then((res) => {
      if (res.code != "200") {
        this.$message.error(res.msg);
      } else {
        this.list = res.obj[0].children;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
</style>