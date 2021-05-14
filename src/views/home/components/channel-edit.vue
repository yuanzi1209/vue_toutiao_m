<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title">我的频道</div>
      <van-button
        plain
        type="danger"
        size="small"
        class="edit-btn"
        @click="isShowEdit = !isShowEdit"
      >
        {{ isShowEdit ? '完成' : '编辑' }}
      </van-button>
    </van-cell>
    <van-grid :column-num="4" :gutter="10" class="grid my-grid">
      <van-grid-item v-for="(item, i) in mychannels" :key="i">
        <van-icon
          name="clear"
          slot="icon"
          v-show="isShowEdit && !fixChannel.includes(item.id)"
        />
        <span
          slot="text"
          class="text"
          :class="{ active: active === i }"
          @click="removeAndActive(item, i)"
          >{{ item.name }}</span
        >
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title">频道推荐</div>
    </van-cell>
    <van-grid :column-num="4" :gutter="10" class="grid recommend-grid">
      <van-grid-item
        v-for="(item, i) in recommendChannel"
        :key="i"
        :text="item.name"
        icon="plus"
        @click="addChannel(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannelList,
  getMyChannel,
  removeChannelById,
} from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  props: {
    mychannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  created() {
    this.loadAllChannelList()
  },
  data() {
    return {
      allChannels: [],
      isShowEdit: false,
      fixChannel: [0], // 固定频道不允许删除
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannel() {
      const channels = []
      // 推荐频道=全部-我的
      this.allChannels.forEach((allChannel) => {
        const res = this.mychannels.find((mychannel) => {
          return mychannel.id === allChannel.id
        })
        if (!res) {
          channels.push(allChannel)
        }
      })

      return channels
    },
  },
  methods: {
    async loadAllChannelList() {
      try {
        const { data: res } = await getAllChannelList()
        console.log('全部频道列表', res.data)
        this.allChannels = res.data.channels
      } catch (err) {
        this.$toast('获取全部频道列表失败')
      }
    },
    async addChannel(item) {
      // console.log(item)
      this.mychannels.push(item)

      // 数据持久化处理
      if (this.user) {
        // 登录-存储到后台
        try {
          const { data: res } = await getMyChannel({
            id: item.id,
            seq: this.mychannels.length, // 序列号
          })
          console.log('我的频道', res)
        } catch (err) {
          console.log(err)
        }
      } else {
        // 未登录-存储到本地
        setItem('mychannels', this.mychannels)
      }
    },
    removeAndActive(item, i) {
      // console.log(item, i)
      // 如果是固定频道不允许删除
      if (this.fixChannel.includes(item.id)) {
        return
      }
      if (this.isShowEdit) {
        // 编辑-删除
        this.mychannels.splice(i, 1)
        // 如果删除的元素在激活项的前面，则需要让激活项-1
        if (i <= this.active) {
          this.$emit('update-active', this.active - 1)
        }
        // 数据持久化处理
        this.removeChannel(item)
      } else {
        // 激活
        this.$emit('update-active', i)
      }
    },
    async removeChannel(item) {
      if (this.user) {
        // 已登录-更新到线上
        try {
          await removeChannelById(item.id)
        } catch (err) {
          console.log(err)
        }
      } else {
        // 未登录-更新到本地
        setItem('mychannels', this.mychannels)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .van-cell__title {
    display: flex;
    align-items: center;
    .title {
      font-size: 32px;
      color: #333;
    }
  }

  .edit-btn {
    width: 100px;
    height: 50px;
    border-radius: 15px;
    .van-button__text {
      font-size: 12px;
    }
  }
  /deep/.grid {
    .van-grid-item {
      width: 160px;
      height: 86px;
      .van-grid-item__content {
        background-color: #f4f5f6;
      }
      .van-grid-item__text {
        font-size: 28px;
        color: #222222;
      }
    }
  }
  /deep/.my-grid {
    .van-icon-clear {
      position: absolute;
      top: -40px;
      right: -90px;
      font-size: 8px;
      z-index: 999;
      color: #ccc;
    }
    .van-grid-item__text {
      margin-top: 0;
    }
    .text {
      font-size: 28px;
      color: #333;
    }
    .active {
      color: red;
    }
  }

  /deep/.recommend-grid {
    .van-grid-item__content {
      flex-direction: row;
      .van-grid-item__icon {
        font-size: 16px;
        color: #333;
      }
      .van-grid-item__text {
        margin-top: 0;
        margin-left: 8px;
        white-space: nowrap;
      }
    }
  }
}
</style>

