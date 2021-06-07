<template>
  <!-- <RoomList /> -->
  <div class="userpage">
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;關於我&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;">
        <el-container>
          <el-main>
            <div class="profile">
              <div style="text-align:left;" class="password_title">
                <h1><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ user.nickname }}</h1>
              </div>

              <el-divider></el-divider>

              <div class="info">
                <div class="infotext">
                  <el-row>
                    <i style="font-size: 50px" class="el-icon-paperclip"></i>
                    <h3
                      style="
                        margin-left: 10px;
                        margin-top: 0px;
                        font-size: 12px;
                        color: gray;
                      "
                    >暱稱</h3>
                    <h2
                      style="
                        margin-left: -20px;
                        margin-top: -5px;
                        font-size: 20px;
                      "
                    ><br />{{ user.nickname }}</h2>
                  </el-row>

                  <el-row>
                    <i style="font-size: 50px" class="el-icon-message"></i>
                    <h3
                      style="
                        margin-left: 10px;
                        margin-top: 0px;
                        font-size: 12px;
                        color: gray;
                      "
                    >信箱</h3>
                    <h2
                      style="
                        margin-left: -20px;
                        margin-top: -5px;
                        font-size: 20px;
                      "
                    ><br />{{ user.email }}</h2>
                  </el-row>

                  <el-row>
                    <i style="font-size: 50px" class="el-icon-user-solid"></i>
                    <h3
                      style="
                        margin-left: 10px;
                        margin-top: 0px;
                        font-size: 12px;
                        color: gray;
                      "
                    >姓名</h3>
                    <h2
                      style="
                        margin-left: -15px;
                        margin-top: -5px;
                        font-size: 20px;
                      "
                    >
                      <br />{{ user.lastName }},<el-button
                        class="btn"
                        @click="clickLastName">編輯</el-button>
                        {{ user.firstName }}<el-button class="btn" @click="clickFirstName">編輯</el-button>
                    </h2>

                    <el-alert
                      v-show="checkLastName"
                      type="info"
                      @close="cancelEditLastName"
                      >
                      <input
                      v-if="checkLastName"
                      type="text"
                      v-model="lastName"
                      prefix-icon="fas fa-lock"
                      @keyup.enter="saveLastName"
                      ref="newlastname"/>
                      <el-button v-show="checkLastName" @click="saveLastName">儲存</el-button>
                    </el-alert>

                    <el-alert
                      v-show="checkFirstName"
                      type="info"
                      @close="cancelEditFirstName"
                      >
                      <input
                      v-if="checkFirstName"
                      type="text"
                      v-model="firstName"
                      prefix-icon="fas fa-lock"
                      @keyup.enter="saveFirstName"
                      ref="newfirstname"/>
                      <el-button v-show="checkFirstName" @click="saveFirstName">儲存</el-button>
                    </el-alert>

                    <!-- <input
                      v-show="checkLastName"
                      type="text"
                      v-model="lastName"
                      @keyup.enter="saveLastName"
                      ref="newlastname"/>
                    <el-button v-show="checkLastName" @click="saveLastName">save</el-button>
                    <input
                      v-show="checkFirstName"
                      type="text"
                      v-model="firstName"
                      @keyup.enter="saveFirstName"
                      ref="newfirstname"/>
                    <el-button v-show="checkFirstName" @click="saveFirstName">save</el-button> -->
                  </el-row>

                  <el-row>
                    <i style="font-size: 50px" class="el-icon-postcard"></i>
                    <h3
                      style="
                        margin-left: 10px;
                        margin-top: 0px;
                        font-size: 12px;
                        color: gray;
                      "
                    >科系</h3>
                    <h2
                      style="
                        margin-left: -15px;
                        margin-top: -5px;
                        font-size: 20px;
                      "
                    ><br />{{ user.department }}</h2>
                  </el-row>
                </div>
              </div>
            </div>

            <el-main>
              <div class="password">
                <div style="text-align:left;" class="password_title">
                  <h1><br />&nbsp;&nbsp;&nbsp;&nbsp;Password</h1>
                </div>

                <el-divider></el-divider>

                <div class="info">
                  <div class="infotext">
                    <el-row>
                      <i
                        style="font-size: 50px; margin-left: 20px"
                        class="el-icon-copy-document"
                      ></i>
                      <h3
                        style="
                          margin-left: 10px;
                          margin-top: 0px;
                          font-size: 12px;
                          color: gray;"
                      >Password</h3>
                      <h2
                        style="
                          margin-left: -50px;
                          margin-top: -5px;
                          font-size: 20px;"
                      ><br />
                        <el-button
                        class="btn" 
                        @click="clickChangePasswoed">change</el-button>

                        <el-alert
                          v-show="checkChangePassword"
                          title="Change your password!"
                          type="info"
                          closable="false"
                          @close="CancelChangePassword"
                          center>
                          <input
                            center
                            v-model="passwordModel.oldPassword"
                            placeholder="Old password"
                            type="password"
                            prefix-icon="fas fa-lock"
                            ref="oldPassword"/>
                          <br/>
                          <input
                            center
                            v-model="passwordModel.newPassword1"
                            placeholder="New password"
                            type="password"
                            prefix-icon="fas fa-lock"
                            ref="newPassword1"/>
                          <br/>
                          <input
                            center
                            v-model="passwordModel.newPassword2"
                            placeholder="Again"
                            type="password"
                            prefix-icon="fas fa-lock"
                            ref="newPassword2"
                            @keyup.enter="sumitChangePassword"/>
                          <br/>
                          <el-button type="info" round @click="sumitChangePassword">Save</el-button>
                        </el-alert>
                      </h2>
                      <h2
                        style="
                          margin-left: 10px;
                          margin-top: -7px;
                          font-size: 20px;"
                      >
                      </h2>
                    </el-row>
                  </div>
                </div>
              </div>
            </el-main>
          </el-main>
        </el-container>
      </el-tab-pane>

      <el-tab-pane label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;帳號管理&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;">
      </el-tab-pane>

      <el-tab-pane label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我的房間&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;">
        <RoomList />
      </el-tab-pane>

      <el-tab-pane label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;房主管理&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;">
      </el-tab-pane>

      <el-tab-pane label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;入房記錄&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"></el-tab-pane>

    </el-tabs>
 


  </div>


</template>

<script>
import UserService from '@/services/UserService.js'
import RoomList from '@/components/RoomList.vue'

export default {
  components: {
    RoomList,
  },
  data() {
    return {
      tabPosition: 'left',
      checkLastName: false,
      checkFirstName: false,
      checkChangePassword: false,
      user: {
        id: 0,
        nickname: '',
        email: '',
        department: '',
        lastName: '',
        firstName: '',
      },
      passwordModel: {
        oldPassword: '',
        newPassword1: '',
        newPassword2: '',
      },
      loading: false,
      rules: {
        password: [
          { required: true, message: 'Password is required', trigger: 'blur' },
          {
            min: 4,
            message: 'Password length should be at least 5 characters',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  async created() {
    if (this.$store.state.token) {
      this.$store
        .dispatch('refreshToken')
        .then((res) => {
          console.log("f1", res)
          return UserService.getUserId()
        }).then((res) => {
          console.log("f2", res)
          this.user.id = res.data.id
          console.log("f3", this.user.id)
          return this.ser_fun()
        }).then((res) => {
          console.log("4444", res)
          return UserService.getUser(this.user.id)
        }).then((res) => {
          console.log("f4", res.data)
          this.user.email = res.data.email
          this.user.nickname = res.data.email
          this.user.department = res.data.department
          this.user.lastName = res.data.last_name
          this.user.firstName = res.data.first_name
        })
        .catch((err) => {
          if (
            'code' in err.response.data &&
            err.response.data['code'] == 'token_not_valid'
          ) {
            this.$store.dispatch('resetToken')
            this.$router.push({
              name: 'login',
            })
          }
        })
    } else {
      console.log('plz login !')
      this.$router.push({
        name: 'login',
      })
    }
  },
  methods: {
    clickLastName() {
      this.checkLastName = true
    },
    cancelEditLastName() {
      this.checkLastName = false
    },
    saveLastName() {
      this.checkLastName = false
      this.user.lastName=this.$refs.newlastname.value
      console.log('666', this.$refs.newlastname.value)
      UserService.putUserEdit(this.user.id, this.$refs.newlastname.value, this.user.firstName)
    },
    clickFirstName() {
      this.checkFirstName = true
    },
    cancelEditFirstName() {
      this.checkFirstName = false
    },
    saveFirstName() {
      this.checkFirstName = false
      this.user.firstName=this.$refs.newfirstname.value
      console.log('777', this.$refs.newfirstname.value)
      UserService.putUserEdit(this.user.id, this.user.lastName, this.$refs.newfirstname.value)
    },
    clickChangePasswoed() {
      this.checkChangePassword = true
      console.log("12346", this.checkChangePassword)
    },
    CancelChangePassword() {
      this.checkChangePassword = false
      console.log("7891011", this.checkChangePassword)
    },
    sumitChangePassword() {
      console.log("111")
      if (this.$refs.newPassword1.value != this.$refs.newPassword2.value) {
        console.log("wrong")
        this.failChangePassword()
      } else {
        UserService.putChangePassword(this.user.id, this.$refs.oldPassword.value, this.$refs.newPassword1.value, this.$refs.newPassword2.value)
        console.log("222", this.user.id)
        console.log("333", this.$refs.oldPassword.value)
        console.log("444", this.$refs.newPassword1.value)
        console.log("555", this.$refs.newPassword2.value)
        this.checkChangePassword = false
      }
    },
    failChangePassword() {
      this.$message({
        message: 'Error!',
        center: true
      });
    },
    ser_fun() {
      this
    }, 
  },
}


</script>

<style>
.profile {
  background-color: rgb(238, 233, 227);
  width: 1000px;
  margin-left: 20px;
}

.profile .imgid {
  top: 160px;
  left: 620px;
}

.profile .imgbut {
  top: 180px;
  left: 620px;
}

.profile .info {
}

.profile .info .infotext {
  text-align: left;
  margin-left: 20px;
}

.el-row {
  margin-bottom: 20px;
}

.password {
  background-color: rgb(238, 233, 227);
  width: 1000px;
}

.password .password_title {
  top: 50px;
}

.password .info {
}

.password .info .infotext {
  text-align: left;
  margin-top: 10px;
}

</style>
