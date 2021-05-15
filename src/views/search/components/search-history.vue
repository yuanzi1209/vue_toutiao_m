<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isShowDelete">
        <span @click="clearSearchHistory">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isShowDelete = false">完成</span>
      </div>
      <van-icon name="delete-o" v-else @click="isShowDelete = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistory"
      :key="index"
      @click="searchAndDelete(item, index)"
    >
      <van-icon name="close" v-show="isShowDelete" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistory: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isShowDelete: false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    searchAndDelete(item, index) {
      if (this.isShowDelete) {
        // 删除
        this.searchHistory.splice(index, 1)
      } else {
        // 显示搜索结果
        this.$emit('showSearchResult',item)
      }
    },
    clearSearchHistory() {
      this.$emit('clearSearchHistory')
    },
  },
}
</script>

<style lang="less" scoped>
</style>