<template>
  <div class="userpage">
    <el-container>
      <UserPageSideBar />
      <router-view />

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
                  >ID</h3>
                  <h2
                    style="
                      margin-left: -12px;
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
                  >E-mail</h3>
                  <h2
                    style="
                      margin-left: -30px;
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
                  >name</h3>
                  <h2
                    style="
                      margin-left: -30px;
                      margin-top: -5px;
                      font-size: 20px;
                    "
                  >
                    <br />{{ user.last_name }},<el-button
                      class="btn"
                      @click="clicklname">edit</el-button>
                      {{ user.first_name }}<el-button class="btn" @click="clickfname">edit</el-button>
                  </h2>
                  <input
                    v-show="checklname"
                    type="text"
                    v-model="last_name"
                    @keyup.enter="savelname"
                    ref="newlastname"/>
                  <el-button v-show="checklname" @click="savelname">save</el-button>
                  <input
                    v-show="checkfname"
                    type="text"
                    v-model="first_name"
                    @keyup.enter="savefname"
                    ref="newfirstname"/>
                  <el-button v-show="checkfname" @click="savefname">save</el-button>
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
                  >department</h3>
                  <h2
                    style="
                      margin-left: -65px;
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
                    @click="clickchangepasswoed">change</el-button>

                    <el-alert
                      v-show="checkchangepassword"
                      title="Change your password!"
                      type="info"
                      closable="false"
                      @close="notchangepassword"
                      center>
                      <input
                        center
                        v-model="passwordmodel.oldpassword"
                        placeholder="Old password"
                        type="primary"
                        prefix-icon="fas fa-lock"
                        ref="oldpassword"/>
                      <br/>
                      <input
                        center
                        v-model="passwordmodel.newpassword1"
                        placeholder="New password"
                        type="primary"
                        prefix-icon="fas fa-lock"
                        ref="newpassword1"/>
                      <br/>
                      <input
                        center
                        v-model="passwordmodel.newpassword2"
                        placeholder="Again"
                        type="primary"
                        prefix-icon="fas fa-lock"
                        ref="newpassword2"
                        @keyup.enter="sumitchange"/>
                      <br/>
                      <el-button type="info" round @click="sumitchange">Save</el-button>
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
    </el-container>
  </div>


</template>

<script>
import UserPageSideBar from '@/components/UserPageSideBar.vue'
import UserService from '@/services/UserService.js'

export default {
  components: {
    UserPageSideBar,
  },

  data() {
    return {
      checknickname: false,
      checkmail: false,
      checklname: false,
      checkfname: false,
      checkdepartment: false,
      checkchangepassword: false,
      user: {
        id: 0,
        nickname: '',
        email: '',
        department: '',
        last_name: '',
        first_name: '',
      },
      passwordmodel: {
        oldpassword: '',
        newpassword1: '',
        newpassword2: '',
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
          this.user.last_name = res.data.last_name
          this.user.first_name = res.data.first_name
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
    clicklname() {
      this.checklname = true
    },
    savelname() {
      this.checklname = false
      this.user.last_name=this.$refs.newlastname.value
      console.log('666', this.$refs.newlastname.value)
      UserService.putUserEdit(this.user.id, this.$refs.newlastname.value, this.user.first_name)
    },
    clickfname() {
      this.checkfname = true
    },
    savefname() {
      this.checkfname = false
      this.user.first_name=this.$refs.newfirstname.value
      console.log('777', this.$refs.newfirstname.value)
      UserService.putUserEdit(this.user.id, this.user.last_name, this.$refs.newfirstname.value)
    },
    clickchangepasswoed() {
      this.checkchangepassword = true
      console.log("12346", this.checkchangepassword)
    },
    notchangepassword() {
      this.checkchangepassword = false
      console.log("7891011", this.checkchangepassword)
    },
    sumitchange() {
      console.log("111")
      if (this.$refs.newpassword1.value != this.$refs.newpassword2.value) {
        console.log("wrong")
        this.failChangePassword()
      } else {
        UserService.putChangePassword(this.user.id, this.$refs.oldpassword.value, this.$refs.newpassword1.value, this.$refs.newpassword2.value)
        console.log("222", this.user.id)
        console.log("333", this.$refs.oldpassword.value)
        console.log("444", this.$refs.newpassword1.value)
        console.log("555", this.$refs.newpassword2.value)

        this.checkchangepassword = false
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