<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar fixed>
      <van-button
        type="info"
        slot="title"
        icon="search"
        class="search-btn"
        round
        to="/search"
        >搜索
      </van-button>
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs v-model="active" animated swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <article-list :channel="item"></article-list>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isShowChannelEdit = true"
      >
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isShowChannelEdit"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :mychannels="channels"
        :active="active"
        @update-active="updateActive"
      />
    </van-popup>
  </div>
</template>

<script>
import { getChannelList } from '@/api/user'
import articleList from '@/views/home/components/article-list'
import ChannelEdit from './components/channel-edit'

export default {
  name: 'HomeIndex',
  components: {
    'article-list': articleList,
    ChannelEdit,
  },
  props: {},
  data() {
    return {
      active: 0,
      channels: [],
      channel: {},
      isShowChannelEdit: false,
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
      console.log('频道列表', res)
      this.channels = res.data.channels
      console.log('channels', this.channels)
      // 已登录-请求获取用户的频道列表
      // 未登录-判断是否有本地的频道列表
    },
    updateActive(i,isShowChannelEdit=true) {
      // console.log('home', i)
      this.active = i
      // 关闭弹框
      this.isShowChannelEdit=isShowChannelEdit
    },
  },
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 174px;
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
    min-width: 200px;
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
    text-align: center;
  }
  // 占位符：解决汉堡按钮遮挡的文字区域
  .placeholder {
    // 不参与 flex 平分
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
      // 显示最长边
      background-size: contain;
    }
  }

  /deep/.van-tabs--line .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 999;
  }
}
</style>
