<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar>
      <van-button
        type="info"
        slot="title"
        icon="search"
        class="search-btn"
        round
        >信息按钮
      </van-button>
    </van-nav-bar>
    <!-- 频道列表 *Tab 标签页-->
    <van-tabs v-model="active" animated swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <article-list :channel="channel"></article-list>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getChannelList } from '@/api/user'
import articleList from '@/views/home/components/article-list'

export default {
  name: 'HomeIndex',
  components: {
    'article-list': articleList,
  },
  props: {},
  data() {
    return {
      active: 0,
      channels: [],
      channel:{}
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadChannelList()
  },
  mounted() {},
  methods: {
    async loadChannelList() {
      const { data: res } = await getChannelList()
      console.log(res)
      this.channels = res.data.channels
      console.log(this.channels)
    },
  },
}
</script>

<style lang="less" scoped>
.home-container {
  padding-bottom: 100px;
  /deep/ .van-nav-bar__title {
    max-width: 100%;
  }
  .search-btn {
    width: 554px;
    height: 66px;
    background-color: #5babfb;
    font-size: 28px;
  }
  /deep/.van-tab {
    border-right: 1px solid #edeff3;
    border-bottom: 1px solid #edeff3;
    .van-tab__text {
      font-size: 30px;
      color: #777777;
    }
  }
  /deep/ .van-tab--active {
    color: green;
  }
  /deep/.van-tabs__line {
    width: 30px;
    height: 6px;
    background-color: #3296fa;
  }
  /* .hamburger-btn {
    position: fixed;
    right: 0;
    width: 68px;
    height: 83px;
    line-height: 83px;
    text-align: center;
    opacity: 0.902;
    i.toutiao {
      font-size: 30px;
      color: #333333;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      width: 1px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  } */
  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }

  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    i.toutiao {
      font-size: 33px;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      width: 1px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
}
</style>
