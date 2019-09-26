<template>
    <div id="list">
        <div class="list-head">
            <div @click="showBox"><i class="fa fa-list-ul"></i></div>
            <div>分类</div>
            <div><i class="fa fa-search"></i></div>
        </div>
        <div class="list-modll" v-if="isShowBox">
            <ul class="nav" ref="nav">
                    <li @click="gohome">
                        <i class="fa fa-shopping-bag"></i>
                        <p>锤子商城</p>
                    </li>
                    <li @click="goGuanWang('https://www.smartisan.com/jianguopro2s/overview')">
                        <i class="fa fa-mobile-phone"></i>
                        <p>坚果 Pro 2S</p>
                    </li>
                    <li>
                        <i class="fa fa-mobile-phone" @click="goGuanWang('https://www.smartisan.com/r1/overview')"></i>
                        <p>坚果 R1</p>
                    </li>
                    <li>
                        <i class="fa fa-television" @click="goGuanWang('https://www.smartisan.com/tnt/overview')"></i>
                        <p>坚果 TNT 工作站</p>
                    </li>
                    <li>
                        <i class="fa fa-mobile-phone" @click="goGuanWang('https://www.smartisan.com/u3/overview')"></i>
                        <p>坚果 3</p>
                    </li>
                    <li>
                        <i class="fa fa-telegram" @click="goGuanWang('https://www.smartisan.com/os/#/6-x')"></i>
                        <p>Smartisan Os</p>
                    </li>
                    <li>
                        <i class="fa fa-cc-mastercard" @click="goGuanWang('https://www.smartisan.com/apps/#/home')"></i>
                        <p>应用</p>
                    </li>
                    <li>
                        <i class="fa fa-android" @click="goGuanWang('https://bbs.smartisan.com/member.php?mod=transfer&from=http%3A%2F%2Fbbs.smartisan.com%2F')"></i>
                        <p>论坛</p>
                    </li>
                    <li>
                        <i class="fa fa-headphones" @click="goGuanWang('https://www.smartisan.com/support/#/servicecenter')"></i>
                        <p>服务支持</p>
                    </li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
        </div>
        <div class="list-phone" v-if="!isShowBox">
            <ul class="ulStyle">
                <li>
                    <h3>手机</h3>
                </li>
                <li>
                    <img :src="bigImgs.one" alt="">
                </li>
                <li>
                    <div>
                        <img :src="shopList[8].shop_info.ali_image" />
                        <span>{{shopList[8].product_info.product_name}}</span>
                    </div>
                    <div>
                        <i class="fa fa-angle-right"></i>
                    </div>
                </li>
                <li>
                   <div>
                        <img :src="shopList[16].shop_info.ali_image" />
                        <span>{{shopList[16].product_info.product_name}}</span>
                    </div>
                    <div>
                        <i class="fa fa-angle-right"></i>
                    </div>
                </li>
            </ul>

        </div>
        <div class="list-phoneParts" v-if="!isShowBox">
            <div class="list-phoneParts-title">
                <h3>手机配件</h3>
            </div>
            <div class="list-phoneParts-img">
                <img :src="bigImgs.two" />
            </div>
            <ul>
                <li v-for="item in phonePartsData" :key="item.id" @click="godetail(item.spu_id)">
                    <div v-if="item.shop_info">
                        <img :src="item.shop_info.ali_image" />
                    </div>
                    <div>
                        {{item.product_info.product_name}}
                    </div>
                </li>
            </ul>
        </div>
        <div class="list-phoneParts" v-if="!isShowBox">
            <div class="list-phoneParts-title">
                <h3>鞋服</h3>
            </div>
            <div class="list-phoneParts-img">
                <img :src="bigImgs.three" />
            </div>
            <ul>
                <li v-for="item in clothingData" :key="item.id" @click="godetail(item.spu_id)">
                    <div>
                        <img :src="item.shop_info.ali_image" />
                    </div>
                    <div>
                        {{item.product_info.product_name}}
                    </div>
                </li>
            </ul>
        </div>
        <div class="list-special" v-if="!isShowBox">
            <h3>畅呼吸</h3>
            <div class="list-special-img">
                <img :src="bigImgs.four" />
            </div>
            <ul>
                <li v-for="item in specialData" :key="item.id" @click="godetail(item.spu_id)">
                    <img :src="item.shop_info.ali_image" />
                    <span>{{item.product_info.product_name}}</span>
                    <i class="fa fa-angle-right"></i>
                </li>
            </ul>
        </div>
        <div class="definedBox"></div>
    </div>
</template>

<script>
import './index.scss';
import {getListShop} from '../../api/axios';

export default {
    data(){
        return {
            isShowBox:false,
            bigImgs:{
                        one:'https://resource.smartisan.com/resource/b1d887c9246cee3a8ba7a7a7c57d5a50.png?x-oss-process=image/resize,w_1093/format,webp',
                        two:'https://resource.smartisan.com/resource/092ccb4ad40c623954fddef7e2ad44d6.png?x-oss-process=image/resize,w_1093/format,webp',
                        three:'https://resource.smartisan.com/resource/790e2855df8a62dfbabea0130a3fdacf.png?x-oss-process=image/resize,w_1093/format,webp',
                        four:'https://resource.smartisan.com/resource/29fd5d173a80c5023861e38c69cf9b7a.png?x-oss-process=image/resize,w_1093/format,webp',
                    },
            shopList:[],
            phonePartsData:[],
            clothingData:[],
            specialData:[]

        }
    },
    created(){
        getListShop().then((res)=>{
           this.shopList=res.data.list;
           this.phonePartsData=[this.shopList[14],this.shopList[7],this.shopList[4],this.shopList[9],this.shopList[13],this.shopList[17]];
           this.clothingData=[this.shopList[12],this.shopList[5],this.shopList[6],this.shopList[11],this.shopList[10],this.shopList[3]];
           this.specialData=[this.shopList[15],this.shopList[1],this.shopList[2],this.shopList[0]]
        })
    },
    methods:{
        showBox(){
            this.isShowBox=!this.isShowBox;
        },
        gohome(){
            this.$router.push('/home')
        },
        goGuanWang(url){
            window.location.href=url;
        },
        godetail(id){
        this.$router.push('/detail/'+id)
    }
    }
}
</script>