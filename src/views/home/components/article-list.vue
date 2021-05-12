<template>
  <div class="article-list-container">
    <van-pull-refresh
      v-model="isRefresh"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="1500"
    >
      <van-list
        finished-text="没有更多了"
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <!-- <van-cell
          v-for="(item, i) in list"
          :key="i"
          :title="item.title"
        ></van-cell> -->
        <article-item
          v-for="(article, i) in list"
          :key="i"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { articleList } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isRefresh: false,
      refreshSuccessText: '刷新成功',
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        // 获取文章列表
        const { data: res } = await articleList({
          channel_id: this.channel.id,
          // timestamp 当前页码 时间戳
          timestamp: this.timestamp || Date.now(),
          with_top: 1,
        })
        // console.log(res)

        this.list.push(...res.data.results)
        console.log('我是list', this.list)

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (res.data.results.length) {
          // 更新时间戳
          this.timestamp = res.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        // console.log('请求失败', err)
        this.error = true
        this.loading = false
      }
    },
    async onRefresh() {
      // console.log('onRefresh')
      // 请求数据
      try {
        // 获取文章列表
        const { data: res } = await articleList({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1,
        })

        // 追加到列表的前面
        this.list.unshift(...res.data.results)
        // 关闭刷新
        this.isRefresh = false
      } catch (err) {
        // console.log('请求失败', err)
        // 关闭刷新
        this.isRefresh = false
        this.refreshSuccessText = '刷新失败'
      }
    },
  },
}
</script>

<style lang="less" scoped>
// 如何让不同的列表产生自己的滚动容器？
.article-list-container {
  height: 80vh;
  overflow-y: auto;
}
</style>
