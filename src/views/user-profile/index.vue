<template>
  <div class="user-profile">
    <!--  导航栏-->
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <!-- 个人信息区 -->
    <input type="file" hidden ref="file" @change="onFileChange" />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isShowEditNamePopup = true"
    />
    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
      @click="isShowEditGenderPopup = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-linkbirthday
      @click="isShowEditBirthdayPopup = true"
    />
    <!-- 编辑昵称弹出层 -->
    <van-popup
      v-model="isShowEditNamePopup"
      style="height: 100%"
      position="bottom"
    >
      <edit-name
        v-if="isShowEditNamePopup"
        @close="isShowEditNamePopup = false"
        v-model="user.name"
      />
    </van-popup>
    <!-- 编辑性别弹出层 -->
    <van-popup v-model="isShowEditGenderPopup" position="bottom">
      <edit-gender
        @close="isShowEditGenderPopup = false"
        v-model="user.gender"
      />
    </van-popup>
    <!-- 编辑生日弹出层 -->
    <van-popup v-model="isShowEditBirthdayPopup" position="bottom">
      <edit-birthday
        v-model="user.birthday"
        @close="isShowEditBirthdayPopup = false"
      />
    </van-popup>
    <!-- 编辑头像弹出层 -->
    <van-popup
      v-model="isShowEditPhotoPopup"
      position="bottom"
      style="height: 100%"
    >
      <edit-photo
        :img="img"
        @close="isShowEditPhotoPopup = false"
        @edit-photo="user.photo = $event"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import EditName from './components/edit-name'
import EditGender from './components/edit-gender'
import EditBirthday from './components/edit-birthday'
import EditPhoto from './components/edit-photo'
export default {
  name: 'UserProfile',
  components: {
    EditName,
    EditGender,
    EditBirthday,
    EditPhoto,
  },
  props: {},
  data() {
    return {
      user: {}, // 个人信息
      isShowEditNamePopup: false,
      isShowEditGenderPopup: false,
      isShowEditBirthdayPopup: false,
      isShowEditPhotoPopup: false,
      img: null,
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadUserProfile()
  },
  mounted() {},
  methods: {
    async loadUserProfile() {
      try {
        const { data: res } = await getUserProfile()
        console.log('用户个人资料', res)
        this.user = res.data
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    onFileChange() {
      // console.log('onFileChange')
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // console.log(file)
      // 基于文章对象获取 blob 数据
      this.img = window.URL.createObjectURL(file)
      // console.log(img)
      this.isShowEditPhotoPopup = true
      // file-input 如果选了同一个文件不会触发 change 事件
      // 解决办法就是每次使用完毕，把它的 value 清空
      this.$refs.file.value = ''
    },
  },
}
</script>

<style scoped lang="less">
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }

  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
