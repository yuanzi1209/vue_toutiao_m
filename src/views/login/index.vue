<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录">
      <van-icon name="cross" slot="left" @click="goBack" />
    </van-nav-bar>
    <!-- 表单区 -->
    <van-form @submit="loginFormSubmit" ref="loginFormRef">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="loginFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="loginFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <!-- 倒计时 -->
          <van-count-down
            :time="1000 * 5"
            format=" ss s"
            v-if="isShowCountDown"
            @finish="isShowCountDown = false"
          />
          <van-button
            v-else
            size="small"
            type="default"
            class="btn_sms"
            native-type="button"
            @click="onSendSms"
          >
            发送验证码
          </van-button>
        </template>
      </van-field>
      <div class="btn_login_wrap">
        <van-button block type="info" class="btn_login"> 登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '../../api/user'

export default {
  name: 'LoginIndex',
  data() {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
      },
      loginFormRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误',
          },
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误',
          },
        ],
      },
      isShowCountDown: false,
    }
  },
  methods: {
    async loginFormSubmit() {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0,
      })

      // 请求
      try {
        const { data: res } = await login(this.user)
        console.log('登录成功', res)
        this.$store.commit('setUser', res.data)
        this.$toast.success('登录成功')
        // 跳转到  思考：也可以跳转到首页
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码输入不正确')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },
    async onSendSms() {
      // 校验手机号
      try {
        // validate 验证表单，支持传入 name 来验证单个或部分表单项
        await this.$refs.loginFormRef.validate('mobile')
        // console.log('验证成功')
      } catch (err) {
        return console.log('验证失败', err)
      }

      // 验证通过显示开启倒计时
      this.isShowCountDown = true

      // 获取短信验证码
      try {
        const res = await sendSms(this.user.mobile)
        // console.log('发送成功', res)
      } catch (err) {
        // 发送验证码失败，关闭倒计时
        this.isShowCountDown = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    },
    goBack() {
      this.$router.back()
    },
  },
}
</script>

<style lang="less" scoped>
.toutiao {
  color: #7b7b7b;
  font-size: 37px;
  margin-right: 10px;
}
.btn_login_wrap {
  padding: 53px 33px;
  .btn_login {
    background-color: #6db4fb;
    border: 0;
    border-radius: 8px;
  }
}
.btn_sms {
  width: 152px;
  height: 46px;
  background-color: #eeeeee;
  border: 0;
  border-radius: 15px;
  color: #b3b3b3;
  font-size: 22px;
}
</style>
