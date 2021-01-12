<template>
  <div class="text-main" v-html="html"></div>
</template>

<script>
export default {
  props: {
    html: {
      type: String,
      default: ""
    },
  },
}
</script>

<style lang="scss" scoped>
.text-main {
  white-space: pre-wrap;
  display: block;
  overflow: auto;
  /deep/ p{
    margin: 0;
  }
}
</style>