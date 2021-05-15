<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，请点击重新加载"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search.js'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, //页码
      per_page: 20, //每页数量
      error: false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    async onLoad() {
      try {
        const { data: res } = await getSearchResult({
          page: this.page, //页码
          per_page: this.per_page, //每页数量
          q: this.searchText, //搜索关键词
        })
        console.log('搜索结果', res)
        /* // 模拟随机失败情况
        if (Math.random() > 0.5) {
          JSON.parse('abcdefg')
        } */
        /* // 易错处：
        this.list = res.data.results */
        // 思考：为什么要这样处理？
        this.list.push(...res.data.results)
        // 显示加载中 => 把加载中的 loading 关闭
        this.loading = false
        // 判断是否还有数据
        if (res.data.results) {
          // 有=>更新页码
          this.page++
        } else {
          // 无=>把finished设置为true
          this.finished = true
        }
      } catch (err) {
        // 轻提示 or list错误提示
        this.error = true
        this.loading = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>