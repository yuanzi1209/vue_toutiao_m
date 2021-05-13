<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title">我的频道</div>
      <van-button plain type="danger" size="small" class="edit-btn">
        编辑
      </van-button>
    </van-cell>
    <van-grid :column-num="4" :gutter="10" class="grid my-grid">
      <van-grid-item v-for="(item, i) in mychannels" :key="i" icon="cross">
        <span slot="text" class="text" :class="{ active: active === i }">{{
          item.name
        }}</span>
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
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannelList } from '@/api/channel'

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
    }
  },
  computed: {
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
  },
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 100px;
    height: 50px;
    border-radius: 20px;
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
    .van-icon-cross {
      position: absolute;
      top: -9px;
      right: -8px;
      font-size: 8px;
      z-index: 999;
      color: #333;
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
      }
    }
  }
}
</style>

