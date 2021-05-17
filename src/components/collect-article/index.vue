<template>
  <van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{ collect: value }"
    :loading="loading"
    @click="isCollect"
  />
</template>

<script>
import { addCollect, cancelCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  components: {},
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    art_id: {
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
    async isCollect() {
      this.loading = true
      try {
        if (this.value) {
          // 已收藏-取消收藏
          const { data: res } = await cancelCollect(this.art_id)
          console.log('取消收藏', res)
        } else {
          // 未收藏-添加收藏
          const { data: res } = await addCollect(this.art_id)
          console.log('添加收藏', res)
        }
        // 通知父组件
        this.$emit('input', !this.value)
        this.$toast(!this.value ? '收藏成功' : '取消收藏')
      } catch (err) {
        // 轻提示
      }
      this.loading = false
    },
  },
}
</script>

<style lang="less" scoped>
/deep/ .collect {
  .van-icon {
    color: orange;
  }
}
</style>