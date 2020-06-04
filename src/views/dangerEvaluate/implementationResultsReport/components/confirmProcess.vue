<template>
  <div class="main-container">
    <span class="step blue">胡子铮 已填写整改措施</span>
    <div class="down"></div>
    <span class="step blue">王鑫武(078932 ) 已 确认</span>
    <div class="down"></div>
    <span class="step blue">李昆(086498 ) 已 确认</span>
    <div class="down"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.main-container {
  text-align: center;
  .step {
    display: inline-block;
    width: 190px;
    height: 100px;
    border: 1px solid #1e9fff;
    text-align: center;
    line-height: 100px;
    font-size: 13px;
    &.blue {
      background-color: #1e9fff;
      color: white;
    }
  }
  .down {
    width: 20px;
    height: 80px;
    position: relative;
    margin: 10px auto;
    &::before {
      content: "";
      border-color: transparent;
      border-style: solid;
      position: absolute;
      border: none;
      background-color: #1e9fff;
      height: 50%;
      width: 75%;
      top: 0;
      left: 60%;
    }
    &::after {
      content: "";
      border-color: transparent;
      border-style: solid;
      position: absolute;
      left: 0;
      top: 50%;
      border-width: 20px 20px;
      border-top-color: #1e9fff;
    }
  }
}
</style>