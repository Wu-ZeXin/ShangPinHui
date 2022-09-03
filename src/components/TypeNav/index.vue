<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseleave="leaveShow">
      <h2 class="all" @mouseenter="changeShow">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">京东超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name='sort'>
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              v-for="(item1, index) in CategoryList"
              :key="item1.categoryId"
              @mouseenter="changeCurrentIndex(index)"
            >
              <h3 :class="{ show: currentIndex === index }">
                <a :data-categoryName="item1.categoryName" :data-category1Id='item1.categoryId'>
                  {{ item1.categoryName }}
                </a>
              </h3>
              <div class="item-list clearfix"
                   :style="{
                    display: currentIndex === index ? 'block' : 'none',
                  }"
              >
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="(item2, index) in item1.categoryChild"
                    :key="item2.categoryId"
                  >
                    <dt>
                      <a :data-categoryName="item2.categoryName" :data-category2Id='item2.categoryId'>
                        {{ item2.categoryName }}
                      </a>
                    </dt>
                    <dd>
                      <em
                        v-for="(item3, index) in item2.categoryChild"
                        :key="item3.categoryId"
                      >
                        <a :data-categoryName="item3.categoryName" :data-category3Id='item3.categoryId'>
                          {{ item3.categoryName }}
                        </a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {throttle} from 'loadsh'

export default {
  name: "TypeNav",

  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },

  computed: {
    ...mapState("home", ["CategoryList"]),
  },

  methods: {
    /* changeCurrentIndex(index) {
      this.currentIndex = index;
    }, */
    //h3的鼠标移入事件:用户行为如果过快，会出现浏览器反应不过来的现象----【用户行为太快】
    //回调函数里面业务代码很多，卡顿、业务没有完整完成。
    //节流功能
    changeCurrentIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 20),

    changeShow() {
      if(this.$route.path != '/home') {
        this.show = true;
      }
    },

    leaveShow() {
      this.currentIndex = -1
      if(this.$route.path != '/home') {
        this.show = false;
      }
    },

    goSearch(event) {
      // 事件的委派 + 编程式导航
      // 通过a标签进行路由跳转
      // 通过event可以获得当前触发事件的节点
      let nodeElement = event.target
      //给a标签添加自定义属性data-categoryName，保证这个节点带data-categoryName，一定是a标签
      //可以通过节点的dataset属性获取相应节点的自定义属性，返回的是一个对象KV【自定义属性相关的】
      //如果带有categoryname字段的一定是a标签
      let { categoryname,category1id,category2id,category3id } = nodeElement.dataset
      // 以categoryName属性来确定触发事件的标签是否是a标签
      if(categoryname){
        // 准备路由跳转参数
        let location = { name:'search' }
        let query = { categoryName:categoryname }
        if(category1id) {
          query.category1Id = category1id
        }else if(category2id) {
          query.category2Id = category2id
        }else {
          query.category3Id = category3id
        }
        //路由跳转之前：看一下有没有params参数，如果有params参数需要携带给search
        if(this.$route.params) {
          location.query = query
          //如有有params参数也需要携带给search模块
          location.params = this.$route.params
          //home->search确实需要记录历史
          //search->search不需要存储历史记录
          if(this.$route.path != '/home') {
            this.$router.replace(location)
          } else {
            this.$router.push(location)
          }
        }
      }
    },
  },

  mounted() {
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
};
</script>

<style lang='less' scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0px 20px;
            margin: 0;

            a {
              color: #333;
            }

            &.show {
              background: skyblue;
              a {
                text-decoration: none;
              }
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          /* &:hover {
            .item-list {
              display: block;
            }
          } */
        }
      }
    }

    .sort-enter {
      height: 0px;
    }

    .sort-enter-to {
      height: 461px;
    }

    .sort-enter-active {
      transition: all 0.1 ;
    }
  }
}
</style>