<template>
  <div class="search-suggestion">
    <van-cell icon="search" v-for="(item, i) in searchSuggestionList" :key="i">
      <div slot="title" v-html="highLight(item)"></div>
    </van-cell>
    <!-- <div>{{ htmlStr }}</div>
    <div v-html=" htmlStr"></div> -->
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search.js'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      searchSuggestionList: [],
      htmlStr: "Hello <span style='color: red'>World</span>",
    }
  },
  computed: {},
  watch: {
    searchText: {
      // 函数防抖
      handler: debounce(function (val) {
        this.loadSearchSuggestion(val)
      }, 1000),
      /*  handler(val) {
        // console.log(val)
        this.loadSearchSuggestion(val)
      }, */
      immediate: true,
    },
  },
  created() {},
  methods: {
    async loadSearchSuggestion(val) {
      try {
        const { data: res } = await getSearchSuggestion(val)
        console.log('搜索建议', res)
        this.searchSuggestionList = res.data.options
      } catch (err) {
        // 轻提示
      }
    },
    highLight(item) {
      // console.log(item)
      // 搜索关键词高亮显示
    },
  },
}
</script>

<style lang="less" scoped>
</style>