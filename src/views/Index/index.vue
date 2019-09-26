<template>
  <div id="index">
    <header class="index-head">
      <i class="icon iconfont icon-chuizi"></i>
    </header>
    <div class="index-search">
      <i class="icon iconfont icon-search"></i>
      <input type="text" placeholder='T恤' />
    </div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in banner" :key="item.index">
          <img :src="item.image" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
    <section class="index-shopClassify-Tel">
      <div class="index-shopClassify-Tel_Banner" >
        <img :src='classifyimgs.one' />
      </div>
      <ul class="index-shopClassify_list">
        <li v-for="item in classifylist.one" :key="item.spuId" @click="godetail(item.spuId)">
            <img data-v-6a3ebfb8 :src="item.images" />
            <div class="imgbg"></div>
            <p>{{item.skuName}}</p>
            <div>
              <span>￥{{item.discountPrice}}</span>
              <span v-if="item.originalPrice">￥{{item.originalPrice}}</span>
              <!-- <p>{{item.promotionList[0].tag?item.promotionList[0].tag:''}}</p> -->
            </div>
          
        </li>
      </ul>
    </section>
    <section class="index-shopClassify-Tel">
      <div class="index-shopClassify-Tel_Banner" >
        <img :src='classifyimgs.two' />
      </div>
      <ul class="index-shopClassify_list">
        <li v-for="item in classifylist.two" :key="item.spuId" @click="godetail(item.spuId)">
            <img data-v-6a3ebfb8 :src="item.images" />
            <div class="imgbg"></div>
            <p>{{item.skuName}}</p>
            <div>
              <span>￥{{item.originalPrice}}</span>
              <span v-if="item.originalPrice">￥{{item.originalPrice}}</span>
              <!-- <p>{{item.promotionList[0].tag}}</p> -->
            </div>
          
        </li>
      </ul>
    </section>
    <section class="index-shopClassify-Tel">
      <div class="index-shopClassify-Tel_Banner" >
        <img :src='classifyimgs.three' />
      </div>
      <ul class="index-shopClassify_list">
        <li v-for="item in classifylist.three" :key="item.skuId" @click="godetail(item.spuId)">
            <img data-v-6a3ebfb8 :src="item.images" />
            <div class="imgbg"></div>
            <p>{{item.skuName}}</p>
            <div>
              <span>￥{{item.originalPrice}}</span>
            </div>
          
        </li>
      </ul>
    </section>
    <section class="index-shoplist">
      <h3>猜你喜欢<i class="fa fa-yelp"></i></h3>
      <ul 
       v-infinite-scroll="loadMore"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="10"
       class="index-shoplistbigBox">
        <li v-for="item in indexlist.list" :key="item.name" @click="godetail(item.spuId)">
          <figure> 
            <img :src="item.images" />
            <aside v-if="item.promotionList.length!==0 && item.promotionList[0].describe">
              <span>{{item.promotionList[0].describe}}</span>
            </aside>
            <div class="imgbg"></div>
          </figure>
          <h4>{{item.skuMobileTitle}}</h4> 
          <div>
            <span><b>￥{{item.discountPrice==0?item.originalPrice:item.discountPrice}}</b></span>
            <span>{{item.discountPrice!==0?item.originalPrice:''}}</span>
            <p v-if="item.promotionList.length!==0">{{item.promotionList[0].tag}}</p>
          </div>
        </li>
       </ul>
    </section>
    <div class="index-bottombox"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { getBanner,getIndexList } from "../../api/axios";
import './index.scss';
import { InfiniteScroll,Toast } from 'mint-ui';
export default {
  data() {
    return {
      banner: [],
      hotshop:'',
      classifyimgs:{
        one:'',
        two:'',
        three:''
      },
      classifylist:{
        one:[],
        two:[],
        three:[]
      },
      indexlist:{
        page:1,
        loading:false,
        list:[]
      },
      loadungflag:false
    };
  },
  created() {
    this.getdata();
  },
  watch: {
    banner: {
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
      getBanner().then(res => {
        this.banner = res.data[0].list;
        this.classifyimgs = {one:res.data[1].header.image,two:res.data[2].header.image,three:res.data[3].header.image}
        this.classifylist = {one:res.data[1].skuInfo,two:res.data[2].skuInfo,three:res.data[3].skuInfo}
      
      });
      getIndexList(this.indexlist.page).then(res => {
        this.indexlist.list=this.indexlist.list.concat(res.data.skuInfo);
        this.indexlist.loading=false;
        this.indexlist.page++;
        // this.loadingflage=list.length >= res.data.skuInfo;
        if(this.indexlist.page>=3){
          this.indexlist.loading=true;
          Toast({
          message: '已经没有新数据了',
          position: 'middle',
          className:'fa fa-exclamation-circle',
          duration: 500
          });
        }
      })
    },
    loadMore(){
      this.getdata()
    },
    godetail(id){
      this.$router.push('/detail/'+id)
    }
  }
};
</script>