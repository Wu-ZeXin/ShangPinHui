<template>
  <div class="register-container">
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <!-- <input type="text" placeholder="请输入你的手机号" v-model="phone"> -->
        <input
          type="text"
          placeholder="请输入你的手机号"
          v-model="phone"
          name="phone"
          v-validate="{ required: true, regex: /^1\d{10}$/ }"
          :class="{ invalid: errors.has('phone') }"
        />
        <!-- <span class="error-msg" v-if="error.showPhoneError">{{ error.showPhoneError }}</span> -->
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input
          type="text"
          placeholder="请输入验证码"
          v-model="code"
          name="code"
          v-validate="{ required: true, regex: /^\d{6}$/ }"
          :class="{ invalid: errors.has('code') }"
        />
        <button @click="getCode">获取验证码</button>
        <span class="error-msg">{{ errors.first("code") }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="password"
          placeholder="请输入你的登录密码"
          v-model="password"
          name="password"
          v-validate="{
            required: true,
            regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
          }"
          :class="{ invalid: errors.has('password') }"
        />
        <span class="error-msg">{{ errors.first("password") }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="password"
          placeholder="请输入确认密码"
          v-model="confirmPassword"
          name="confirmPassword"
          v-validate="{ required: true, is: password }"
          :class="{ invalid: errors.has('confirmPassword') }"
        />
        <span class="error-msg">{{ errors.first("confirmPassword") }}</span>
      </div>
      <div class="controls">
        <input
          type="checkbox"
          v-model="agree"
          name="agree"
          v-validate="{ required: true, agree: true }"
          :class="{ invalid: errors.has('agree') }"
        />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first("agree") }}</span>
      </div>
      <div class="btn">
        <button @click="register">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",

  data() {
    return {
      // 手机号
      phone: "",
      // 密码
      password: "",
      // 验证码
      code: "",
      // 密码确认
      confirmPassword: "",
      // 同意协议
      agree: true,

      /* error: {
        showPhoneError: "",
        showCodeError: "",
        showPasswordError: "",
        showConfirmError: "",
        showAgreeError: "",
      }, */
    };
  },

  methods: {
    async getCode() {
      let phone = this.phone;

      if (phone) {
        try {
          await this.$store.dispatch("user/getCode", this.phone);
          this.code = this.$store.state.user.code;
        } catch {}
      }
    },

    async register() {
      //这里是vee-valadiate提供的一个方法，如果表单验证全部成功，返回布尔值真，
      //如有有一个字段验证失败，返回布尔值false
      const success = await this.$validator.validateAll();
      console.log(success);
      if (success) {
        //进行判断：全部的字段，表单验证成功以后在发请求，
        //只要有一个字段验证没有通过，补发请求
        //携带参数的：phone code password
        const { phone, code, password, confirmPassword } = this;
        //不做表单验证[稍微验证一下]
        try {
          //注册成功
          await this.$store.dispatch("user/getRegister", { phone, code, password });
          //跳转到登录页面
          this.$router.push("/login");
        } catch (error) {
          //注册失败
          console.log(error);
        }
      }
    },

    /* async register() {
      let regexPhone = /^1\d{10}$/
      let regexCode = /^\d{6}$/
      let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/

      if(regexPhone.test(this.phone) && regexCode.test(this.code) && regexPassword.test(this.password) && this.password == this.confirmPassword) {
        try {
          await this.$store.dispatch('user/getRegister',{
            phone: this.phone,
            code: this.code,
            password: this.password
          })
          alert('注册成功')
          this.$router.push('/login')
        } catch(error) {
          alert(error)
        }
         
      }
    } */
  },

  /* watch:{
    agree() {
      if(this.agree == true) {
        this.error.showAgreeError = ''
      } else {
        this.error.showAgreeError = '请勾选协议'
      }
    },

    phone() {
      let regexPhone = /^1\d{10}$/
      // 验证手机号码
      if(!regexPhone.test(this.phone)) {
        if(this.phone == '') {
          this.error.showPhoneError = "未输入手机号码"
        } else if(!regexPhone.test(this.phone)) {
          this.error.showPhoneError = "手机号码格式无效"
        }
      } else {
        this.error.showPhoneError = ''
      }
    },

    code() {
      let regexCode = /^\d{6}$/
      // 校对验证码
      if(!regexCode.test(this.code)) {
        if(this.code == '') {
          this.error.showCodeError = "验证码为空"
        } else if(!regexCode.test(this.code)) {
          this.error.showCodeError = "验证码格式无效"
        }
      } else {
        this.error.showCodeError = ''
      }
    },

    password() {
      let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/
      // 验证密码
      if(!regexPassword.test(this.password)) {
        if(this.password == '') {
          this.error.showPasswordError = "密码为空"
        } else if(!regexPassword.test(this.password)) {
          this.error.showPasswordError = "密码必须同时包含数字与字母,且长度为 8-20位"
        }
      } else {
        this.error.showPasswordError = ''
      }
    },

    confirmPassword() {
      // 确认密码
      if(!(this.password == this.confirmPassword) || this.confirmPassword == '') {
        if(this.confirmPassword == '') {
          this.error.showConfirmError = "密码为空"
        } else if(!(this.password == this.confirmPassword)) {
          this.error.showConfirmError = "两次输入的密码不相同"
        }
      } else {
        this.error.showConfirmError = ''
      }
    }
  } */
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      button {
        width: 100px;
        height: 38px;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>