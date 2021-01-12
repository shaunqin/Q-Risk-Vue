<template>
  <div ref="echartId" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import { debounce } from '@/utils'
import { mapState } from 'vuex'

export default {
  props: {
    chartData: {
      type: Object,
      default: () => {}
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data () {
    return {
      chart: null
    }
  },
  computed: {
    ...mapState({
      collapse: state => state.collapse
    })
  },
  // 1.监听菜单收缩变化 图表自适应 2.监听数据变化 初始化图表
  watch: {
    collapse () {
      this.resizeHandler()
    },
    chartData: {
      deep: true,
      handler (val) {
        this.chart.setOption(val)
      }
    }
  },
  mounted () {
    this.resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    this.initResizeEvent()
    this.initChart()
  },
  beforeDestroy () {
    this.destroyResizeEvent()
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$refs.echartId)
      this.chart.setOption(this.chartData)
    },
    // 监听浏览器窗口变化 图表自适应
    initResizeEvent () {
      window.addEventListener('resize', this.resizeHandler)
    },
    destroyResizeEvent () {
      window.removeEventListener('resize', this.resizeHandler)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
