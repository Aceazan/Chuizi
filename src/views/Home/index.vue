<template>
    <div id="home">
        <router-view />
        <footer class="home-footer">
            <ul>
                <li>
                    <router-link to='/'>
                        <i class="fa fa-yelp"></i>
                        <span>首页</span>
                    </router-link>
                </li>
                <li>
                    <router-link to='/list'>
                        <i class="fa fa-list-ul"></i>
                        <span>分类</span>
                    </router-link>
                </li>
                <li>
                    <router-link to='/cart'>
                        <i class="fa fa-shopping-cart" v-if="isShow"></i>
                        <span v-if="isShow">购物车</span>
                        <i class="fa fa-shopping-cart relativ" v-if="!isShow"></i>
                        <span v-if="!isShow" class="relativspan"><b>2</b></span>
                    </router-link>
                </li>
                <li>
                    <router-link to='/user'>
                        <i class="fa fa-user-o"></i>
                        <span>我</span>
                    </router-link>
                </li>
            </ul>
        </footer>
    </div>
</template>

<script>
import './index.scss'
export default {
    data(){
        return {
            cart:'',
            isShow:true
        }
    },
    watch:{
        $route(to,from){
            if(to.path==='/cart'){
                this.isShow=!this.isShow
            }else{
                this.isShow=true
            }
        }
    },
    // methods:{
    //     cartHtml(){
    //         console.log(this.$refs.)
    //     }
    // }
    
}
</script>