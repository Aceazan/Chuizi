<template>
  <div id="cart">
    <div class="cart-head">
      <b>购物车</b>
      <p @click="showBox" v-if="!isshowBox">{{defaul?'编辑':'完成'}}</p>
    </div>
    <div class="cart-containerOne" v-if="isshowBox">
      <div class="cart-containerOne_box">
        <div class="icon">
          <i class="fa fa-shopping-bag"></i>
        </div>
        
          <h3>购物车暂无商品</h3>
          <p>添加到购物车的商品将会显示在这里</p>
          <button @click="gohome">现在选购</button>
      </div>
    </div>
    <div class="cart-containerTwo">
        <!--默认样式-->
        <div class="cart-containerTwo-default" v-if="defaul">
            <div class="youhuiquan">
                <i class="fa fa-credit-card-alt"></i>
                <p><b>点击领取优惠券</b></p>
                <i class="fa fa-angle-right"></i>
            </div>
            <ul>
                <li v-for="item in shopList" :key="item.index">
                    <div>
                        <input type="checkbox" v-model="item.flag" @click="changeCkeckEd(item.name)"/>
                    </div>
                    <div>
                        <img :src="item.img"/>
                    </div>
                    
                    <div>
                        <p><b>{{item.name}}</b></p>
                        <p>
                            <span><b>￥{{item.pic}}</b></span>
                            <span>x{{item.num}}</span>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <!--操作样式-->
        <div class="cart-containerTwo-cazuo" v-if="!defaul">
            <ul>
                <li v-for="item in shopList" :key="item.index">
                    <div class="checked">
                        <input type="checkbox" v-model="item.flag" @click="changeCkeckEd(item.name)"/>
                    </div>
                    <div class="image">
                        <img :src="item.img"/>
                    </div>
                    
                    <div class="calc">
                        <p><b>{{item.name}}</b></p>
                        <div>
                            <button @click="minus(item.id)">-</button>
                               <span> {{item.num}}</span>
                            <button @click="add(item.id)">+</button>
                            <p><b>￥{{item.pic}}</b></p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="jiesuan" v-if="!isshowBox">
        <div>
            <input type="checkbox" v-model="allcheck" @click="changeAllCkeck"/>
            <span>已选{{shopList.length}}件</span>
        </div>
        <div v-if="defaul">
            <p>合计：￥{{allshopnum}}</p>
            <p>应付总额不含运费</p>
        </div>
        <div class="btn" @click="remove">{{defaul?'现在结算':"删除所选"}}</div>
    </div>
  </div>
</template>

<script>
import "./index.scss";
import { Toast } from 'mint-ui';
export default {
    data(){
        return {
            isshowBox:false,
            shopList:[],
            defaul:false,
            allshopnum:0,
            allcheck:true
        }
    },
    mounted(){
         let val = JSON.parse(sessionStorage.getItem('Shop'))
         if(val){
             this.isshowBox=false;
             this.defaul=true,
             this.shopList=[...val]
             
         }else{
             this.isshowBox=true;
         }
    },
    updated(){
       var num =0;
       this.shopList.forEach(item=>{
           if(item.flag===true){
               
               num+=item.pic
           }
           return num
       })
       this.allshopnum=num;
    },
    methods:{
        gohome(){
            this.$router.push('/home')
        },
        showBox(){
            this.defaul=!this.defaul;
        },
         minus(id){
             this.shopList.forEach(item=>{
                 if(item.id===id){
                     if(item.num>0){
                         item.num-=1;
                     }
                 } 
             })
         },
         add(id){
             this.shopList.forEach(item=>{
                 if(item.id===id){
                    item.num+=1;
                    if(item.num>=5){
                        item.num=5;
                     Toast({
                        message: '已超过最大可购买量',
                        position: 'bottom',
                        duration: 1500
                        });
                 }
                 }
                 
             })
         },
         changeCkeckEd(name){
             this.shopList.forEach(item=>{
                 if(item.name===name){
                     item.flag=!item.flag;
                     console.log(item.flag)
                 }
             })
             let len = []
             this.shopList.forEach(item=>{
                 if(item.flag===false){
                      this.allcheck=false
                 }else{
                     len.push(item.flag)
                     if(len.length===this.shopList.length){
                         this.allcheck=true
                     }
                 }
                
             })
         },
         changeAllCkeck(){
             this.allcheck=!this.allcheck;
             this.shopList.forEach(item=>{
                 item.flag=this.allcheck;
             })
         },
         remove(){
             if(this.defaul){
                //  console.log(111)
             }else{
                 this.shopList.forEach(item=>{
                 if(item.flag==true){
                    this.shopList.slice 
                 }
             })
             
             }
             if(this.shopList==''){
                 this.isshowBox=true;
             }
         }
    }
    
};
</script>