<template>
  <van-button
    round
    size="small"
    v-if="value"
    :loading="loading"
    @click="isFollow"
    >已关注
  </van-button>
  <van-button
    v-else
    :loading="loading"
    type="badge"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="isFollow"
    >关注</van-button
  >
</template>

<script>
import { addFollow, cancelFollow } from '@/api/user'
export default {
  name: 'FollowUser',
  components: {},
  props: {
    /* is_followed: {
      type: Boolean,
      required: true,
    }, */
    value: {
      type: Boolean,
      required: true,
    },
    aut_id: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async isFollow() {
      this.loading = true
      try {
        if (this.value) {
          // 已关注-取消关注
          const { data: res } = await cancelFollow(this.aut_id)
          console.log('取消关注', res)
          // this.article.value = false
        } else {
          // 未关注-添加关注
          const { data: res } = await addFollow(this.aut_id)
          console.log('添加关注', res)
          // this.article.value = true
        }
        // this.article.value = !this.article.value
        // 通知父组件
        // this.$emit('update-value', !this.value)
        this.$emit('input', !this.value)
      } catch (err) {
        // 轻提示
        if (err.response && err.response.status === 400) {
          this.$toast('不能关注自己哦')
        } else {
          this.$toast('操作失败，请稍后重试')
        }
      }
      this.loading = false
    },
  },
}
</script>