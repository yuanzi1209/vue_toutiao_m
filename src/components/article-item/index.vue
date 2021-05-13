<template>
  <div>
    <van-cell class="article-item">
      <div slot="title" class="title van-multi-ellipsis--l2">
        {{ article.title }}
      </div>
      <!-- 下 -->
      <div slot="label">
        <div v-if="article.cover.type === 3" class="img3">
          <van-image
            v-for="(item, i) in article.cover.images"
            :key="i"
            :src="article.cover.images[i]"
            fit="cover"
          />
        </div>
        <div class="text">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }} 评论</span>
          <span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </div>
      <!-- 右 -->
      <van-image
        slot="default"
        v-if="article.cover.type === 1"
        class="img1"
        :src="article.cover.images[0]"
        fit="cover"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="less">
.article-item {
  display: flex;
  border: 1px solid #edeff3;
  .title {
    font-size: 32px;
    color: #3a3a3a;
    margin-bottom: 30px;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .img3 {
    display: flex;
    height: 146px;
    .van-image {
      flex: 1;
      margin-right: 4px;
    }
  }

  .text {
    // min-width: 480px;
    font-size: 23px;
    color: #b4b4b4;
    margin-top: 30px;
    span {
      margin-right: 20px;
    }
  }
}
</style>
