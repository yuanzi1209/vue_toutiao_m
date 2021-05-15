<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296FA"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShowResult = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isShowResult" :searchText="searchText" />
    <!-- 搜索建议 -->
    <search-suggestion
      v-else-if="searchText"
      :searchText="searchText"
      @needSearchRes="onSearch"
    />
    <!-- 搜索历史 -->
    <search-history
      v-else
      :searchHistory="searchHistory"
      @clearSearchHistory="searchHistory = []"
      @showSearchResult="onSearch"
    />
  </div>
</template>

<script>
import searchSuggestion from './components/search-suggestion'
import searchResult from './components/search-result'
import searchHistory from './components/search-history'
export default {
  name: 'SearchIndex',
  components: {
    searchSuggestion,
    searchResult,
    searchHistory,
  },
  props: {},
  data() {
    return {
      searchText: '',
      isShowResult: false,
      searchHistory: [],
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    onSearch(val) {
      // console.log('onSearch', val)
      this.searchText = val
      // 存储搜索历史
      // 要求：1）不允许重复；2）最新搜索的排在最前面
      // this.searchHistory.push(val)

      /*  // 逻辑漏洞：如果最新输入的内容是重复的，不会更新到最前面
       const res = this.searchHistory.includes(val)
      if (!res) {
        this.searchHistory.unshift(val)
      }
      this.isShowResult = true */
      const index = this.searchHistory.indexOf(val)
      if (index !== -1) {
        // 重复 => 把之前的删掉，再追加最新的
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(val)
      this.isShowResult = true
    },
    onCancel() {
      // console.log('onCancel')
      this.$router.back()
    },
  },
}
</script>

<style lang="less" scoped>
.search-container {
  // 处理部分文字被固定搜索栏遮挡问题
  padding-top: 108px;
  .search-form {
    // 固定搜索栏
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search__action {
    color: #fff;
  }
}
</style>