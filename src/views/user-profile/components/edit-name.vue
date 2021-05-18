<template>
  <div class="edit-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <!-- 输入框 -->
    <div class="field-wrap">
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
export default {
  name: 'EditName',
  components: {},
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      message: this.value,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onConfirm() {
      // 提升用户体验
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0, // 持续展示
      })
      try {
        const message = this.message
        if (!message.length) {
          this.$toast('昵称不能为空')
          return
        }
        const { data: res } = await editUserProfile({
          name: message,
        })
        console.log('编辑昵称成功', res)
        // 关闭弹层
        this.$emit('close')
        // 更新UserProfile视图
        this.$emit('input', message)
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },
  },
}
</script>

<style scoped lang="less">
/deep/.van-nav-bar {
  background-color: #fff;
  .van-nav-bar__title {
    color: #333;
  }
}
.field-wrap {
  padding: 20px;
}
</style>
