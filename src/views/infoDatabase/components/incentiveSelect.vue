<template>
  <el-row :gutter="16" style="display:flex;">
    <el-col :span="4">
      <dict-select type="incentive_category" :value="value1" @change="dictChange" placeholder="筛选分类"></dict-select>
    </el-col>
    <el-col :span="20">
      <el-select filterable multiple v-model="_value" placeholder style="width: 100%;">
        <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.no"></el-option>
      </el-select>
    </el-col>
  </el-row>
  <!-- <el-cascader :options="option" v-model="_value" :props="{expandTrigger:'hover',multiple:true}" style="width: 100%;"></el-cascader> -->
</template>

<script>
import { queryIncentiveList } from "@/api/standard";
import dictSelect from "@/components/common/dictSelect";
export default {
  components: { dictSelect },
  data() {
    return {
      totalList: [],
      value1: "",
      option: [],
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
    list() {
      if (!!this.value1)
        return this.totalList.filter(
          (r) => r.incentiveCateValue == this.value1
        );
      return this.totalList;
    },
  },
  created() {
    queryIncentiveList().then((res) => {
      if (res.code != "200") {
        this.$message.error(res.msg);
      } else {
        this.totalList = res.obj;
      }
    });
  },
  methods: {
    dictChange(val) {
      this.value1 = val;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>