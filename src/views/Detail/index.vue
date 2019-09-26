<template>
  <div id="detail">
    <div class="detail-head">
      <div class="detail-head_goback" @click="goback">
        <i class="fa fa-angle-left"></i>
        返回
      </div>
      <div class="detail-head_title">{{acone.title}}</div>
    </div>
    <div class="detail-container">
      <div class="detail-container-tab">
        <ul>
          <li @click="tab($event,'tab-container1')" class="ac">商品</li>
          <li @click="tab($event,'tab-container2')">详情</li>
          <li @click="tab($event,'tab-container3')">参数</li>
          <li @click="tab($event,'tab-container4')">推荐</li>
        </ul>
      </div>
      <mt-tab-container v-model="active">
        <mt-tab-container-item id="tab-container1">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="item in shopimg" :key="item.index">
                <img :src="item" />
              </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
          </div>
          <div class="tab-container1-center">
            <div class="tab-container1-center-info">
              <div class="tab-container1-center-info-head">
                <h4>{{acone.title}}</h4>
                <p>{{acone.list.shop_info && acone.list.shop_info.spu_sub_title ? acone.list.shop_info.spu_sub_title : ''}}</p>
                <div class="tab-container1-center-info-head_price">
                  <span></span>
                  <span v-if="acone.list.price">￥{{acone.list.price}}</span>
                  <span>满99包邮</span>
                </div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container2">
          <h4 class="titleBox">商品详情</h4>
          <div>
            <img :src="acone.list.shop_info.tpl_content.base.images.ali.url" alt="" class="detail-xiangqing">
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container3">
          <h4 class="titleBox">技术参数</h4>
          <ul class="technicalParameters">
            <li v-for="item in acone.list.shop_info.tpl_content.base.attributes[0].list" :key="item.index">
              <span><b>{{item.name}}</b></span>
              <span>{{item.value}}</span>
            </li>
          </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container4">
          <h4 class="titleBox">相关推荐</h4>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <footer class="detail-footer">
      <div class="detail-footer-cart" @click="gocart">
        <i class="fa fa-cart-plus"></i>
        <span><b>{{num}}</b></span>
      </div>
      <div class="detail-footer-buy" v-if="btnshow" @click="isBtnShow">
        <b>立即购买</b>
      </div>
      <div class="detail-footer-affirm" v-if="!btnshow" @click="isBtnShow">
        确认
      </div>
      <div class="detail-footer-addCart" v-if="btnshow" @click="isBtnShow">
        <b>加入购物车</b>
      </div>
    </footer>
  </div>
</template>

<script>
import "./index.scss";
import { getDetail, getDetailShopimg } from "../../api/axios";
import { TabContainer, TabContainerItem } from "mint-ui";
import Swiper from "swiper";
export default {
  data() {
    return {
      acone: {
        title: "",
        list:[]
      },
      shopimg: [],
      active: "tab-container1",
      btnshow:true,
      tuijian:[],
      val :[],
      num:''
    };
  },
  created() {
    this.getdata();
    //
  },
  updated(){
    if(sessionStorage.getItem('Shop'))
   this.val=JSON.parse(sessionStorage.getItem('Shop'))
      this.num=this.val.length
  },
  watch: {
    shopimg: {
      handler() {
        this.$nextTick(() => {
          var mySwiper = new Swiper(".swiper-container", {
           autoplay: {
              delay: 3000,
              disableOnInteraction: false
            },
            loop: true,
            pagination: {
              el: ".swiper-pagination"
            } //循环模式选项
          });
        });
      }
    }
  },
  methods: {
    getdata() {
      let id = this.$route.params.id;
      getDetail(id).then(res => {
        this.acone.title = res.data.list[0].name;
        this.acone.list = res.data.list[0];
        //  console.log(this.acone.list)
        let str = [];
        res.data.list[0].sku_info.forEach(item => {
          str.push(item.sku_id);
        });
        let sum = str.join(",");
        getDetailShopimg(sum).then(resone => {
          this.tuijian=resone;
          // console.log(this.tuijian)
          resone.data.list.forEach(item => {
            if (item.spu_id === res.data.list[0].id) {
              this.shopimg = item.shop_info.ali_images;
            }
          });
        });
      });
    },
    isBtnShow(){
      this.btnshow=!this.btnshow;
      if(sessionStorage.getItem('Shop'))//判断sessionStorage的Shop是否存在
      this.val=JSON.parse(sessionStorage.getItem('Shop'))
      this.val.push({name:this.acone.list.name,img:this.shopimg[0],pic:this.acone.list.price,num:1,flag:true})
      sessionStorage.setItem('Shop',JSON.stringify(this.val))
      this.val=JSON.parse(sessionStorage.getItem('Shop'))
      this.num=this.val.length
    },
    goback() {
      this.$router.go(-1);
    },
    tab(e, val) {
      this.active = val;
      var b = e.target.parentNode.childNodes;
      b.forEach(item => {
        item.className = "";
      });
      e.target.className = "ac";
    },
    gocart(){
      this.$router.push('/cart')
    }
  }
};
</script>