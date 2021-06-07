<template>
  <div id="up-sidebar" class="up-sidebar">
    <el-container style="height: 500px">
      <el-aside width="200px">
        <el-menu :default-openeds="['1', '2', '3', '4', '5']">
          <el-submenu index="1">
            <template #title
              ><router-link to="/userpage2"
                ><i class="el-icon-message"></i>About me</router-link
              ></template
            >
            <el-menu-item-group>
              <template #title>My account</template>
            </el-menu-item-group>

            <el-menu-item-group>
              <template #title>Password</template>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4">
            <template #title
              ><router-link to="/userpage_roomlist"
                ><i class="el-icon-s-home"></i>Room</router-link
              ></template
            >
            <el-menu-item-group>
              <template #title>Joining room</template>
            </el-menu-item-group>

            <el-menu-item-group>
              <template #title>Invited room</template>
            </el-menu-item-group>

            <el-menu-item-group>
              <template #title>History</template>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
    </el-container>
  </div>
</template>

<script>

export default {
}
</script>

<style scoped>
.el-menu {
  text-align: left;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  width: 740px;
}

.profile {
  /* float: left; */
  border: 10px solid #aaaaaa;
  width: 682px;
}

.profile .imgid {
  /* position: absolute; */
  top: 160px;
  left: 620px;
}

.profile .imgbut {
  /* position: absolute; */
  top: 180px;
  left: 620px;
}

.profile .info {
  /* position: relative; */
  border: 1px solid #2e1313;
  width: 680px;
}

.profile .info .infotext {
  text-align: left;
  margin-left: 20px;
}

.el-row {
  margin-bottom: 20px;
}

.password {
  float: left;
  border: 10px solid #aaaaaa;
  width: 682px;
  margin-left: -20px;
}

.password .password_title {
  top: 50px;
  /* margin-bottom: 10px; */
}

.password .info {
  /* position: relative; */
  border: 1px solid #2e1313;
  width: 680px;
}

.password .info .infotext {
  text-align: left;
  margin-top: 10px;
  /* margin-left: 20px; */
}
</style>
