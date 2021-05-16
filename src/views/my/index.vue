<template>
  <div class="my-container">
    <!-- 已登录 {{userInfo.name}}-->
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" round :src="userInfo.photo" />
          <span class="uname">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-info">
        <div class="data-item">
          <span class="num">{{ userInfo.follow_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="num">{{ userInfo.art_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="num">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="num">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="toLoginPage">
        <img src="../../assets/mobile.png" class="mobile-img" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 宫格导航 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item>
        <i class="toutiao toutiao-shoucang" slot="icon"></i>
        <span slot="text">收 藏</span>
      </van-grid-item>
      <van-grid-item>
        <i class="toutiao toutiao-lishi" slot="icon"></i>
        <span slot="text">历 史</span>
      </van-grid-item>
    </van-grid>

    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小智同学" is-link />
    <van-cell
      class="logout-cell"
      clickable
      title="退出登录"
      v-if="user"
      @click="logout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'

export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data() {
    return {
      userInfo: {},
    }
  },
  computed: {
    ...mapState(['user']),
  },
  watch: {},
  created() {
    // this.loadUserInfo()
    // 细节处理
    if (this.user) {
      this.loadUserInfo()
    }
  },
  mounted() {},
  methods: {
    toLoginPage() {
      this.$router.push('/login')
    },
    logout() {
      // 退出提示-清除登录状态
      this.$dialog
        .confirm({
          title: '确认退出登录吗？',
        })
        .then(() => {
          //  console.log('确认');
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          //  console.log('取消');
        })
    },
    async loadUserInfo() {
      const { data: res } = await getUserInfo()
      // console.log(res)
      this.userInfo = res.data
      // console.log(this.userInfo)
    },
  },
}
</script>

<style lang="less" scoped>
.my-container {
  // height: 1000px;
  .header {
    height: 361px;
    background: url('../../assets/banner.png');
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 2px solid #fff;
          margin-right: 23px;
        }
        .uname {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-info {
      display: flex;
      justify-content: space-around;
      height: 130px;
      .data-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
      }
      .num {
        font-size: 36px;
      }
      .text {
        font-size: 23px;
      }
    }
  }
  .grid-nav {
    height: 140px;
    i.toutiao {
      font-size: 44px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ffbc64;
    }
    span {
      font-size: 28px;
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>
