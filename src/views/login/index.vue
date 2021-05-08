<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- 表单区 -->
    <van-form @submit="loginFormSubmit" ref="loginFormRef">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="loginForm.mobile"
        :rules="loginFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i> >
      </van-field>
      <van-field
        name="code"
        placeholder="请输入验证码"
        v-model="loginForm.code"
        :rules="loginFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            :time="1000 * 10"
            format=" ss s"
            v-show="isShowCountDown"
          />
          <van-button
            size="small"
            type="default"
            class="btn_yzm"
            native-type="button"
            @click="onSendYzm"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="btn_login_wrap">
        <van-button block type="info" native-type="submit" class="btn_login"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendYzm } from '../../api/user'
export default {
  name: 'LoginIndex',
  data() {
    return {
      loginForm: {
        mobile: '',
        code: '',
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

      try {
        const { data: res } = await login(this.loginForm)
        console.log('登录成功', res)
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          // console.log('手机号或验证码输入不正确')
          this.$toast.fail('手机号或验证码输入不正确')
        } else {
          // console.log('登录失败，请重新登录')
          this.$toast.fail('登录失败，请重新登录')
        }
      }
    },
    async onSendYzm() {
      try {
        this.$refs.loginFormRef.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      this.isShowCountDown = true
      /* 获取短信验证码 */
      // try {
      //   await SendYzm(this.loginForm.mobile)
      // } catch (err) {
      //   console.log(err)
      // }
    },
  },
}
</script>

<style lang="less" scoped>
.toutiao {
  color: #7b7b7b;
  font-size: 20px;
  margin-right: 10px;
}
.btn_login_wrap {
  padding: 35px 20px;
  .btn_login {
    background-color: #6db4fb;
    border: 0;
    border-radius: 8px;
  }
}
.btn_yzm {
  background-color: #eeeeee;
  border: 0;
  border-radius: 15px;
  color: #b3b3b3;
  font-size: 12px;
}
</style>
