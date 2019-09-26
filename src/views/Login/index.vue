<template>
    <div id="login">
        <header class="login-head">
                    登录官网
                </header>
                <div class="login-center">
                    <input type="username" placeholder="手机号/邮箱" ref="loginName" v-model="name"/>
                    <input type="password" placeholder="密码" ref="loginPass" v-model="pass"/>
                </div>
                <div class="login-operate">
                    <div class="login-operate_autobtn">
                        <p class="fa fa-check-circle"></p>
                        <p>自动登录</p>
                    </div>
                    <div class="login-operate_right">
                            <p class="login-registerBtn" @click='goregister'>
                                注册
                            </p>
                            <p class="login-operate_right-wjmm">
                                忘记密码
                            </p>
                    </div>
                </div>
                <button class="LoginBtn" @click="submit">登录</button>
                <div class="login-phoneLogin">
                        <p>国际手机号登录</p>
                        <i class="fa fa-angle-right"></i>
                </div>
    </div>
</template>

<script>
import './index.scss';
import { Toast } from 'mint-ui';

export default {
    data(){
        return  {
            Tishi:'',
            name:'',
            pass:''
        }
    },
    mounted(){
        this.name=this.$route.query.username;
        this.pass=this.$route.query.password;
        console.log(this.$route.query)
    },
    methods:{
        submit(){
            let namev = this.$refs.loginName.value,
                passv = this.$refs.loginPass.value;

                if(namev!=='' && passv!==''){
                    let val = JSON.parse(sessionStorage.getItem('user'));
                    if(val && val.length!==0){
                        val.forEach(item=>{
                        if(item.name===namev){
                            if(item.passWord===passv){
                                Toast({
                                     message: '登录成功',
                                     position: 'middle',
                                     duration: 1500
                                });
                                this.$router.push({path:'/user',query:{name:namev}})
                            }else{
                                Toast({
                                     message: '密码不正确',
                                     position: 'middle',
                                     duration: 2500
                                });
                            }
                        }else{
                            Toast({
                                     message: '该用户不存在',
                                     position: 'middle',
                                     duration: 2500
                                });
                        }
                    })
                    }else{
                        Toast({
                                     message: '您还没有注册该账户',
                                     position: 'middle',
                                     duration: 2500
                                });
                    }
                    
                }else{
                    Toast({
                        message: '用户名或密码不能为空',
                        position: 'middle',
                        duration: 2500
                        });
                }
            

        },
        goregister(){
            this.$router.push('/register')
        }
    }
}
</script>