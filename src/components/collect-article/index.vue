<template>
  <van-icon
    color="#777"
    :name="value ? 'star' : 'star-o'"
    :class="{ collect: value }"
  />
</template>

<script>
export default {
  name: 'CollectArticle',
  components: {},
  props: {
    value: {
      type: Boolean,
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

<style lang="less" scoped>
// /deep/ {
//   color: orange;
// }
</style>