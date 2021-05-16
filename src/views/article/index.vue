<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- 用户信息 -->
        <van-cell class="user-badge" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <!-- 
            * $event 是子组件传递过来的参数
            * 当父传递给子组件的数据既要使用又要修改时，可简化
              传递：props :is_followed="article.is_followed"
              修改：自定义事件  @update-is_followed="article.is_followed = $event" 
              简写：v-model
                   value="article.is_followed"
                   @input="article.is_followed = $event"-->
          <follow-user
            v-model="article.is_followed"
            :aut_id="article.aut_id"
            class="follow-btn"
          />
          <!-- <van-button
            class="follow-btn"
            round
            size="small"
            v-if="article.is_followed"
            :loading="isShowFollowLoading"
            @click="isFollow"
            >已关注
          </van-button>
          <van-button
            v-else
            :loading="isShowFollowLoading"
            class="follow-btn"
            type="badge"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="isFollow"
            >关注</van-button
          > -->
        </van-cell>
        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small"
            >写评论</van-button
          >
          <van-icon name="comment-o" badge="123" color="#777" />
          <collect-article v-model="article.is_collected" />
          <van-icon color="#777" name="good-job-o" />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
      </div>
      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'
import followUser from '@/components/follow-user'
import collectArticle from '@/components/collect-article'

export default {
  name: 'ArticleIndex',
  components: {
    followUser,
    collectArticle,
  },
  props: {
    // 解耦路由参数
    articleId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      article: {}, // 文章详情
      loading: true,
      errStatus: 0,
      isShowFollowLoading: false,
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticle()
  },
  mounted() {},
  methods: {
    onClickLeft() {
      // console.log('返回')
      this.$router.back()
    },
    async loadArticle() {
      this.loading = true
      try {
        const { data: res } = await getArticleById(this.articleId)
        console.log('获取文章详情', res)

        // 制造错误
        if (Math.random() > 0.5) {
          JSON.parse('abcdefg')
        }
        //数据驱动视图不是立即发生的
        this.article = res.data
        setTimeout(() => {
          // console.log(this.$refs['article-content'])
          this.imagePreview()
        }, 0)
      } catch (err) {
        // 轻提示
        // 注意点：必须写err.response
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
      }
      // 关闭 loading
      this.loading = false
    },
    imagePreview() {
      // *思路：
      // 1、从文章内容中获取到所有的 img DOM 节点
      // 2、获取文章内容中所有的图片地址
      // 3、遍历所有 img 节点，给每个节点注册点击事件
      // 4、在 img 点击事件处理函数中，调用 ImagePreview 预览
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images,
            // 指定初始位置
            startPosition: index,
          })
        }
      })
    },
  },
}
</script>

<style scoped lang="less">
@import './github-markdown.css';

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-badge {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-badge {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
