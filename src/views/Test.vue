<template >
  <div class="alert">
    <el-button type="text" @click="open">点击打开 Message Box</el-button>

    <el-alert
      title="成功提示的文案"
      type="info"
      closable="false"
      center>
      <input
        center
        v-model="model.oldpassword"
        placeholder="Old password"
        type="primary"
        prefix-icon="fas fa-lock"
        ref="oldpassword"/>
      <br/>

      <input
        center
        v-model="model.newpassword1"
        placeholder="New password"
        type="primary"
        prefix-icon="fas fa-lock"
        ref="newpassword1"/>

      <br/>

      <input
        center
        v-model="model.newpassword2"
        placeholder="Again"
        type="primary"
        prefix-icon="fas fa-lock"
        ref="newpassword2"/>

        <br/>

      <el-button type="info" round @click="sumitchange">信息按钮</el-button>
  </el-alert>


  </div>


</template>



<script>
  import UserService from '@/services/UserService.js'

export default {


  data() {
    return {
      user: {
        id: 0,
      },
      model: {
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
    sumitchange() {
      console.log("111")
      UserService.putChangePassword(this.user.id, this.$refs.oldpassword.value, this.$refs.newpassword1.value, this.$refs.newpassword2.value)
      console.log("222", this.user.id)
      console.log("333", this.$refs.oldpassword.value)
      console.log("444", this.$refs.newpassword1.value)
      console.log("555", this.$refs.newpassword2.value)
    },

    ser_fun() {
      this
    }, 
  },
}
</script>

<style scoped>
/* https://codesandbox.io/s/l9v2vyypm?file=/src/components/Login.vue */
.alert {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-image: url('https://www.ntu.edu.tw/12scence/01b1.jpg'); */
  /* background-size: cover; */
}



.forgot-password {
  margin-top: 10px;
}
.alert-button {
  width: 100%;
  margin-top: 40px;
}
.alert .el-input__prefix {
  background: rgb(238, 237, 234);
  left: 0;
  height: calc(100% - 2px);
  left: 1px;
  top: 1px;
  border-radius: 3px;
}
</style>