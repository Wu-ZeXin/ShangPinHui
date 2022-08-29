<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(shop, index) in shopList" :key="shop.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="shop.isChecked"
              @click="updateChecked(shop, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="shop.imgUrl" />
            <div class="item-msg">{{ shop.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ shop.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="updateSkuNum($event, shop, -1, 'mins')"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="shop.skuNum"
              minnum="1"
              class="itxt"
              @input="updateSkuNum($event, shop, $event.target.value, 'input')"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="updateSkuNum($event, shop, 1, 'add')"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ shop.skuPrice * shop.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteCart(shop)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" @click="updateAllChecked($event)" v-model="isChecks"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteCartChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">0</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade" target="_blank">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";

export default {
  name: "ShopCart",

  mounted() {
    this.getShopCartList();
  },

  computed: {
    ...mapGetters("shopcart", ["shopCartList"]),

    shopList() {
      return this.shopCartList.cartInfoList || [];
    },

    //全选按钮选中|未选中
    isChecks() {
      //遍历数组里面的每一个元素（产品）：如果每一个产品的isChecked属性都为1->勾上
      //如果有一个产品isChecked属性为零，底下计算返回的是布尔值false->不够选上
      return this.shopList.every((item) => item.isChecked == 1) && this.shopList.length>0;
    },
  },

  methods: {
    getShopCartList() {
      this.$store.dispatch("shopcart/getShopCart");
    },

    // 更改商品数量
    updateSkuNum: throttle(async function (e, shop, disNum, flag) {
      switch (flag) {
        case "mins":
          {
            if (shop.skuNum > 1) {
              disNum = -1;
            } else {
              disNum = 0;
            }
          }
          break;
        case "add":
          {
            disNum = 1;
          }
          break;
        case "input": {
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) - shop.skuNum;
          }
        }
      }

      try {
        await this.$store.dispatch("detail/addShopCart", {
          skuId: shop.skuId,
          skuNum: disNum,
        });
        this.getShopCartList();
        if (e.target.localName == "input") {
          e.srcElement.blur();
        }
      } catch (error) {
        console.log(error);
      }
    }, 500),

    // 更改商品选中情况
    async updateChecked(shop, event) {
      let isChecked = event.target.checked ? "1" : "0";

      try {
        await this.$store.dispatch("shopcart/updateCartChecked", {
          skuId: shop.skuId,
          isChecked: isChecked,
        });
        this.getShopCartList();
      } catch (error) {
        console.log(error);
      }
    },

    async updateAllChecked(event) {
      let isChecked = event.target.checked ? "1" : "0"

      try{
        await this.$store.dispatch("shopcart/updateAllCart",isChecked)
        this.getShopCartList()
      } catch(error) {
        alert(error)
      }
      
    },

    async deleteCart(shop) {
      try {
        await this.$store.dispatch('shopcart/deleteCart',shop.skuId)
        this.getShopCartList()
      } catch(error) {
        alert(error);
      }
    },

    async deleteCartChecked() {
      try{
        this.$store.dispatch('shopcart/deleteCartByChecked')
        this.getShopCartList()
      } catch(error) {
        alert(error)
      }
    }
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 0;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>