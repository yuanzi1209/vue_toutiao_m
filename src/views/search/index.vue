<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296FA"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShowResult=false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isShowResult" />
    <!-- 搜索建议 -->
    <search-suggestion v-else-if="searchText" :searchText="searchText" />
    <!-- 搜索历史 -->
    <search-history v-else />
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
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    onSearch() {
      // console.log('onSearch')
      this.isShowResult=true
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
  .van-search__action {
    color: #fff;
  }
}
</style>