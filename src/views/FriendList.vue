<template>
  <div class="userpage">
    <el-container>
      <UserPageSideBar />
      <router-view />

    </el-container>
  </div>


</template>

<script>
import UserPageSideBar from '@/components/UserPageSideBar.vue'

export default {
  components: {
    UserPageSideBar,
  },
}
</script>

<style scoped>

</style>