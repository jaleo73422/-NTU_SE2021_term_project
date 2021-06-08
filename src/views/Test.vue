<template>
  <div class="resetPWD">
    <el-card class="reset-card">
      <h2>變更密碼</h2>
      <el-form
        class="reset-form"
        :model="passwordModel"
        :rules="rules"
        ref="form"
        @submit.prevent="submit"
      >
        <el-form-item prop="oldPassword" label="請輸入舊密碼">
          <!-- <el-input
            v-model="passwordModel.oldPassword"
            placeholder="Input password again"
            type="password"
            prefix-icon="fas fa-repeat"
          ></el-input> -->
          <input
            center
            v-model="passwordModel.oldPassword"
            placeholder="請輸入舊密碼"
            type="password"
            prefix-icon="fas fa-lock"
            ref="oldPassword"/>
        </el-form-item>

        <el-form-item prop="newPassword1" label="請輸入新密碼">
          <!-- <el-input
            v-model="passwordModel.newPassword1"
            placeholder="Input password"
            type="password"
            prefix-icon="fas fa-lock"
          ></el-input> -->
          <input
            center
            v-model="passwordModel.newPassword1"
            placeholder="請輸入新密碼"
            type="password"
            prefix-icon="fas fa-lock"
            ref="newPassword1"/>
        </el-form-item>

        <el-form-item prop="newPassword2" label="再輸入一次">
          <!-- <el-input
            v-model="passwordModel.newPassword2"
            placeholder="Input password again"
            type="password"
            prefix-icon="fas fa-repeat"
          ></el-input> -->
          <input
            center
            v-model="passwordModel.newPassword2"
            placeholder="再輸入一次"
            type="password"
            prefix-icon="fas fa-lock"
            ref="newPassword2"
            @keyup.enter="sumitChangePassword"/>
        </el-form-item>

        <el-form-item>
          <!-- <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            
            block
            >確定送出</el-button
          > -->
          <el-button type="info" round @click="sumitChangePassword">確認送出</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import UserService from '@/services/UserService.js'
import RoomService from '@/services/RoomService.js'

export default {
  props: ['userToken', 'mailToken'],
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.passwordModel.newPassword1) {
        callback(new Error('兩次輸入密碼不一致 !'))
      } else {
        callback()
      }
    }
    return {
      user: {
        id: 0,
        nickname: '',
        email: '',
        department: '',
        lastName: '',
        firstName: '',
      },
      loading: false,
      passwordModel: {
        oldPassword: '',
        newPassword1: '',
        newPassword2: '',
      },

      rules: {
        oldPassword:[
          {
            required: true,
            message: '此為必填欄位',
            trigger: 'blur',
          },
          {
            min: 4,
            message: '密碼需至少4個字',
            trigger: 'blur',
          },

        ],
        newPassword1: [
          {
            required: true,
            message: '此為必填欄位',
            trigger: 'blur',
          },
          {
            min: 4,
            message: '密碼需至少4個字',
            trigger: 'blur',
          },
        ],
        newPassword2: [
          { required: true, message: '此為必填欄位',
          trigger: 'blur' },
          {
            min: 4,
            message: '密碼需至少4個字',
            trigger: 'blur',
          },
          { validator: validatePass2, trigger: 'blur' },
        ],
      },
    }
  },

  async created() {
    this.forDev()
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
    forDev() {
      this.passwordModel.oldPassword = ''
      this.passwordModel.newPassword1 = ''
      this.passwordModel.newPassword2 = ''
    },
    submitReset() {
      console.log('submitReset')
      return RoomService.postResetPassword(
        this.userToken,
        this.mailToken,
        this.passwordModel.newPassword1
      )
    },   
    sumitChangePassword() {
      console.log("111")
      if (this.$refs.oldPassword.value == "" | this.$refs.newPassword1.value == "" | this.$refs.newPassword2.value == "") {
        console.log("wrong")
        this.noInputPassword()
      } else if (this.$refs.newPassword1.value != this.$refs.newPassword2.value) {
        console.log("wrong")
        this.notEqualNewPassword()
      } else {
        UserService.putChangePassword(this.user.id, this.$refs.oldPassword.value, this.$refs.newPassword1.value, this.$refs.newPassword2.value)
        console.log("222", this.user.id)
        console.log("333", this.$refs.oldPassword.value)
        console.log("444", this.$refs.newPassword1.value)
        console.log("555", this.$refs.newPassword2.value)
        this.checkChangePassword = false
      }
    },
    notEqualNewPassword() {
      this.$message({
        message: '兩次密碼不一致',
        center: true
      });
    },
    noInputPassword() {
      this.$message({
        message: '輸入不能為空白',
        center: true
      });
    },
    ser_fun() {
      this
    },
  },
}
</script>
<style scoped>
/* https://codesandbox.io/s/l9v2vyypm?file=/src/components/Login.vue */
/* https://www.gushiciku.cn/pl/g60t/zh-tw */
.resetPWD {
  /* flex: 1; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-image: url('https://www.ntu.edu.tw/12scence/01b1.jpg'); */
  /* background-size: cover; */
}
.resetPWD:before {
  background-image: url('https://www.ntu.edu.tw/12scence/01b1.jpg');
  width: 100%;
  height: 100%;
  background-size: cover;
  content: '';
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  display: block;
  filter: blur(7px);
}
.reset-card {
  background: rgba(255, 255, 255, 0.39);
  border: none;
  color: #ffffff;
}
.reset-form .el-input input {
  background: rgba(255, 255, 255, 0.2);
}
.reset-form {
  width: 290px;
}
.reset-button {
  width: 100%;
  margin-top: 40px;
}
.resetPWD .el-input__prefix {
  background: rgb(238, 237, 234);
  left: 0;
  height: calc(100% - 2px);
  left: 1px;
  top: 1px;
  border-radius: 3px;
}
</style>
