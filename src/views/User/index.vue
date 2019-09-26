<template>
    <div id="user">
          <!-- {/* 头部内容 */} -->
               <header class="user-head">
                   <div class="user-head_title"><b>个人中心</b></div>
               </header>
                
                <!-- {/* 登录信息 */} -->
                <div class="user-shopMessage">
                    <div class="user-shopMessage_top" @click='gologin'>
                        <img src="//static.smartisanos.cn/account/asset/img/default-user-avatar.png" />
                        <p>{{username==''?'登陆/注册':username}}</p>
                        <i class="fa fa-angle-right"></i>
                    </div>
                    <ul class="user-shopMessage_bottom">
                        <li>
                            <i class="fa fa-file"></i>
                            <p>全部订单</p>
                        </li>
                        <li>
                            <i class="fa fa-credit-card"></i>
                            <p>待付款</p>
                        </li>
                        <li>
                            <i class="fa fa-truck"></i>
                            <p>待收货</p>
                        </li>
                        <li>
                            <i class="fa fa-sign-language"></i>
                            <p>善后</p>
                        </li>
                    </ul>
                </div>

                <!-- {/* 购物优惠 */} -->
                <ul class="user-shopCard">
                        <li>
                            <p>地址管理</p>
                            <i class="fa fa-angle-right"></i>
                        </li>
                        <li>
                            <p>我的优惠券</p>
                            <i class="fa fa-angle-right"></i>
                        </li>
                        <li>
                            <p>优先购买码</p>
                            <i class="fa fa-angle-right"></i>
                        </li>
                        <li>
                            <p>提货兑换卡</p>
                            <i class="fa fa-angle-right"></i>
                        </li>
                </ul>

                <!-- {/* 帮助 */} -->
                <ul class="user-help">
                    <li>
                        <p>常见问题</p>
                        <i class="fa fa-angle-right"></i>
                    </li>
                    <li>
                        <p>服务支持</p>
                        <i class="fa fa-angle-right"></i>
                    </li>
                </ul>

                <!-- {/* 维修服务 */} -->
                <ul class="service user-help">
                    <li>
                        <p>意外碎屏保修服务</p>
                        <i class="fa fa-angle-right"></i>
                    </li>
                    <li>
                        <p>延长保修服务</p>
                        <i class="fa fa-angle-right"></i>
                    </li>
                </ul>
    </div>
</template>

<script>
import './user.scss'
export default {
    data(){
        return {
            username:''
        }
    },
    mounted(){
        this.username=this.$route.query.name;
    },
    methods:{
        gologin(){
            this.$router.push('/login')
        }
    }
}
</script>