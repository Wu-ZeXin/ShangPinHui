<template>
  <div>
    <TypeNav />
    <!--list-content-->
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <!-- 1 -->
          <ul class="fl sui-tag">
            <!-- 面包屑可能有也可能没有 -->
            <!-- 产品名字的按钮 -->
            <!-- 导航栏标签产生的面包屑 -->
            <li class="with-x" v-show="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="clearName">x</i>
            </li>
            <!-- 用户搜索关键词产生的面包屑 -->
            <li class="with-x" v-show="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="clearKeyWord">x</i>
            </li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-show="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="clearTrademark">x</i>
            </li>
            <li
              class="with-x"
              v-for="(prop, index) in searchParams.props"
              :key="index"
            >
              {{ prop.split(":")[1] }}
              <i @click="clearProp(index)">x</i>
            </li>
          </ul>
        </div>
        <Selector
         
          @getAttrInfo="getAttrInfo"
         /> <!--@getTradeMarkInfo="getTradeMarkInfo" -->
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 2 -->
              <ul class="sui-nav">
                <li :class="{ active: isComprehensive } " @click="changeOrder('1')">
                  <a
                    >综合<span
                      v-show="isComprehensive"
                      class="iconfont"
                      :class="{
                        'icon-long-arrow-down': isDesc,
                        'icon-long-arrow-up': isAsc,
                      }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isPrice }" @click="changeOrder('2')">
                  <a
                    >价格<span
                      v-show="isPrice"
                      class="iconfont"
                      :class="{
                        'icon-long-arrow-down': isDesc,
                        'icon-long-arrow-up': isAsc,
                      }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <GoodsList />
          <Pagination :total="total" :pageSize="searchParams.pageSize" :pageNo="searchParams.pageNo" :continues="5" @currentPage="currentPage"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Selector from "@/pages/Search/Selector";
import GoodsList from "@/pages/Search/GoodsList";

export default {
  name: "Search",

  data() {
    return {
      searchParams: {
        categoryName: "",
        category1Id: "",
        category2Id: "",
        category3Id: "",
        keyword: "",
        props: [],
        trademark: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
      },
    };
  },

  beforeMount() {
    // 在组件被挂载之前将$route的query和params参数合并到searchParams对象上
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },

  mounted() {
    this.getSearchList();
  },

  methods: {
    getSearchList() {
      this.$store.dispatch("search/getSearchList", this.searchParams);
    },

    // 清除列表名的面包屑
    clearName() {
      this.searchParams.categoryName = "";

      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },

    clearKeyWord() {
      this.searchParams.keyword = "";

      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
      this.$store.dispatch("home/changeKeyWord", "");
    },

    // 获取品牌信息
    // getTradeMarkInfo(tradeMark) {
    //   this.searchParams.trademark = `${tradeMark.tmId}:${tradeMark.tmName}`;
    //   this.getSearchList();
    // },

    clearTrademark() {
      this.searchParams.trademark = "";
      this.getSearchList();
    },

    // 获取商品信息
    getAttrInfo(attr, value) {
      let prop = `${attr.attrId}:${value}:${attr.attrName}`;
      if (this.searchParams.props.indexOf(prop) == -1) {
        this.searchParams.props.push(prop);
        this.getSearchList();
      }
    },

    clearProp() {
      this.searchParams.props = [];
      this.getSearchList();
    },

    changeOrder(flag) {
      let orginFlag = this.searchParams.order.split(":")[0];
      let orginSort = this.searchParams.order.split(":")[1];

      if (flag == orginFlag) {
        this.searchParams.order = `${orginFlag}:${orginSort == "desc" ? "asc" : "desc"}`;
      }else {
        this.searchParams.order = `${flag}:desc`
      }

      this.getSearchList()
    },

    currentPage(pageNo){
       //修改给服务器携带的参数
       this.searchParams.pageNo = pageNo;
       //本次存储持久化
      //  localStorage.setItem('pageNo',pageNo);
       //再次发请求
       this.getSearchList();
    }
  },

  computed: {
    isComprehensive() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    
    isPrice() {
      return this.searchParams.order.indexOf("2") != -1;
    },

    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },

    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },

    trademark:{
      get() {
        return this.$store.state.search.trademark
      }
    },

    ...mapState({
       total:state=>state.search.searchList.total
    })
  },

  components: {
    Selector,
    GoodsList,
  },

  watch: {
    $route() {
      //清除上一次发请求的id
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
      // //先收集最新的搜索条件（再次整理参数），在想服务器发请求
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // //再次发请求
      // this.getSearchList();
      this.getSearchList();
    },

    trademark(){
      // this.searchParams.trademark = `${this.$store.state.search.trademark.tmId}:${this.$store.state.search.trademark.tmName}`
      this.searchParams.trademark = `${this.trademark.tmId}:${this.trademark.tmName}`
      this.getSearchList()
    }
  },
};
</script>

<style lang='less' scoped>
.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;
    .bread {
      margin-bottom: 5px;
      overflow: hidden;
      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;
        li {
          display: inline-block;
          line-height: 18px;
          a {
            color: #666;
            text-decoration: none;
            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }
      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;
        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;
          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          &:hover {
            color: #28a3ef;
          }
        }
      }
    }
    .details {
      margin-bottom: 5px;
      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;
        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;
            li {
              float: left;
              line-height: 18px;
              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }
              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }
    }
    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;
      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }
      .hot-list {
        padding: 15px;
        ul {
          display: flex;
          li {
            width: 25%;
            height: 100%;
            .list-wrap {
              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }
              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }
              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }
              .price {
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: -5px;
                  }
                }
              }
              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>