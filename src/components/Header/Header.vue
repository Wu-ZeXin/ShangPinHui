<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
        <div class="container">
            <div class="loginList">
                <p>京东商城欢迎您！</p>
                <p v-if="!userInfo.name">
                    <span>请</span>
                    <router-link to="/login">登录</router-link>
                    <router-link to="/register" class="register">免费注册</router-link>
                </p>

                <p v-else="userInfo.name">
                    <a href="javascript:;">{{ userInfo.name }}</a>
                    <a href="javascript:;" class="register" @click="userLoginOut">退出登录</a>
                </p>
            </div>
            <div class="typeList">
                <router-link to="/center/myorder">我的订单</router-link>
                <router-link to="/shopcart">我的购物车</router-link>
                <a href="javascript:;">我的京东</a>
                <a href="javascript:;">京东会员</a>
                <a href="javascript:;">企业采购</a>
                <a href="javascript:;">关注京东</a>
                <a href="javascript:;">合作招商</a>
                <a href="javascript:;">商家后台</a>
            </div>
        </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
        <h1 class="logoArea">
            <router-link class="logo" title="尚品汇" to="/home">
                <!-- <img src="https://misc.360buyimg.com/mtd/pc/index_2019/1.0.1/assets/sprite/header/sprite.png" alt=""> -->
                <div class="sprite"><span class="sprite-logo"></span></div>
            </router-link>
        </h1>
        <div class="searchArea">
            <form action="###" class="searchForm">
                <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword"/>
                <button class="sui-btn btn-xlarge btn-danger" type="button" @click="SearchGood">搜索</button>
            </form>
        </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name:'Header',

  /* data(){
    return {
      keyWord:''
    }
  }, */

  computed:{
    keyword:{
      get() {
        return this.$store.state.home.keyword
      },
      set(value) {
        this.$store.commit('home/CHANGEKEYWORD', value);
      }
    },

    ...mapState('user',['userInfo'])
  },

  methods:{
    SearchGood(){
      let location = {
          name: "search",
          params: { keyword: this.keyword || undefined },
      };
      if(this.$route.query) {
        location.query = this.$route.query;
        this.$router.push(location)
      }else {
        this.$router.push(location)
      }
      /* 2.设置params参数可传可不传   /search/:keyWord?
      this.$router.push({ name:'search',query:{title:"123"}})
      3.如果指定name与params配置, 但params中数据是一个"", 无法跳转
      解决1: 不指定params
      解决2: 指定params参数值为undefined
      4.路由传参方式：布尔模式、对象模式、函数模式（主）
      this.$router.push({ name:'search'}) */
    },

    userLoginOut() {
      this.$store.dispatch('user/userLoginOut')
      this.$router.push('/home')
    }
  },

}
</script>

<style lang="less" scoped>
  .header {
    &>.top {
      background-color: #eaeaea;
      height: 30px;
      line-height: 30px;

      .container {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .loginList {
          float: left;

          p {
              float: left;
              margin-right: 10px;

              .register {
                  border-left: 1px solid #b3aeae;
                  padding: 0 5px;
                  margin-left: 5px;
              }
          }
        }

        .typeList {
          float: right;

          a {
              padding: 0 10px;

              &+a {
                  border-left: 1px solid #b3aeae;
              }
          }
        }

      }
    }

    &>.bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 150px;
                    margin: 25px 45px;
                    background-size: 240px 150px;
                }

                .sprite {
                  width: 210px;
                  height: 120px;
                  background-image: url(https://misc.360buyimg.com/mtd/pc/index_2019/1.0.1/assets/sprite/header/sprite.png);
                  background-position: 0 0;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
    }
</style>