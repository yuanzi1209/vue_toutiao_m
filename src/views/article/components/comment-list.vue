<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :immediate-check="false"
    @load="onLoad"
  >
    <comment-item
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
      @reply-click="$emit('reply-click', $event)"
    />
  </van-list>
</template>

<script>
import { getComment } from '@/api/comment'
import commentItem from './comment-item'

export default {
  name: 'CommentList',
  props: {
    // 文章id或评论id
    art_id: {
      type: [Number, String, Object],
      required: true,
    },
    type: {
      type: String,
      // *自定义prop数据验证
      validator(value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a',
    },
    // 若父组件不传值，则默认为[]
    list: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    commentItem,
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
    }
  },
  created() {
    this.loading = true
    this.onLoad()
  },
  methods: {
    async onLoad() {
      // 1. 请求获取数据
      const { data: res } = await getComment({
        type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.art_id, // 源id，文章id或评论id
        offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: this.limit, // 每页大小
      })

      // 2. 将数据添加到列表中
      console.log('获取评论', res)
      this.list.push(...res.data.results)

      // 父组件想要使用 total_count
      this.$emit('comment-data', res.data)

      // 3. 将loading 设置为 false
      this.loading = false

      // 4. 判断是否还有数据
      if (res.data.results.length) {
        this.offset = res.data.last_id // 更新获取下一页数据的页码
      } else {
        this.finished = true // 没有数据了，关闭加载更多
      }
    },
  },
}
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>