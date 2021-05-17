<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="
        currentComment.reply_count > 0
          ? `${currentComment.reply_count}条回复`
          : '暂无回复'
      "
    >
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <!-- 滚动区 -->
    <div class="scroll-wrap">
      <!-- 当前评论 -->
      <comment-item :comment="currentComment" />
      <!-- 评论的回复列表 -->
      <van-cell title="全部回复" />
      <comment-list
        :art_id="currentComment.com_id"
        type="c"
        :list="commentList"
      />
    </div>
    <!-- 底部 -->
    <div class="reply-bottom">
      <van-button
        class="write-btn"
        size="small"
        round
        @click="isShowCommentPopup = true"
        >写评论</van-button
      >
    </div>
    <!-- 评论弹出层 -->
    <van-popup v-model="isShowCommentPopup" position="bottom">
      <comment-post :target="currentComment.com_id" @post-success="onPost" />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
import CommentPost from './comment-post'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPost,
  },
  props: {
    currentComment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isShowCommentPopup: false,
      commentList: [],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onPost(val) {
      console.log('评论回复', val)
      // 更新导航栏的回复数量
      this.currentComment.reply_count++
      // 更新评论的回复列表（显示在最前面）
      this.commentList.unshift(val.new_obj)
      // 关闭弹层
      this.isShowCommentPopup = false
    },
  },
}
</script>

<style lang="less" scoped>
// *滚动区处理
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>