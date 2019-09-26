<template>
    <div id="register">
        <header class="register-head">
                    注册 Smartisan ID
                </header>
                <div class="register-center">
                    <div class="register-center_nation">
                        <p>国家和地区</p>
                        <p @click="showList">{{LiValue}}</p>
                        <i class="fa fa-angle-double-down" @click="showList"></i>
                        <ul class='register-center_nation-list' ref="nationList" v-if="isShow">
                            <li @click="changeValue(item.name,item.tel)" v-for="item in list" :key="item.index">
                                {{item.name}}
                            </li> 
                        </ul>
                    </div>
                    <div class="registe-center-phoneId">
                        <p>+<span>{{SpanValue}}</span></p>
                        <input type="text" placeholder="手机号"  maxLength={11} ref="R_name" @focus="showTishi('name')" @blur="Nothishi"/>
                    </div>
                    <div class="ntishi">{{nameTishi}}</div>
                    <div class="registe-center_verify">
                        <input type='number' placeholder='短信验证码' />
                        <button>获取验证码</button>
                    </div>
                    <div class="registe-center_passwordBox">
                        <input type="password" placeholder='密码' ref="R_pass" @focus="showTishi('pass')" @blur="Nothishi"/>
                    </div>
                    <div class="ptishi">{{passTishi}}</div>
                    <div class="registe-cente_protocol">
                        <i class="fa fa-check-circle"></i>
                        <p>我已阅读并同意遵守 <span>法律声明</span> 和 <span>隐私条款</span></p>
                    </div>
                    <button class="RegisteBtn" @click='RegisteBtn'>注册</button>
                    <p class="registe-goLogin">如果您已拥有 Smartisan ID，则可在此  <span @click="goLogin">登录</span></p>
                </div>
    </div>
</template>

<script>
import './index.scss';
import List from './state.json';
import { Toast } from 'mint-ui';

export default {
    data(){
        return {
             LiValue:'中国',
             SpanValue:86,
             isShow:false,
             list:List,
             nameTishi:'',
             passTishi:'',
             info : []
        }
    },
    methods:{
        changeValue(name,del){
            this.LiValue=name;
            this.SpanValue=del;
            this.isShow=!this.isShow;
        },
        showList(){
            this.isShow=!this.isShow;
        },
        goLogin(){
            this.$router.push('/login')
        },
        RegisteBtn(){
            let name = this.$refs.R_name.value,
                pass = this.$refs.R_pass.value,
                user = JSON.parse(sessionStorage.getItem('user'));
            if(name!=='' && pass!==''){
                let reg1 = /^[A-Za-z0-9\u4e00-\u9fa5]{3,6}$/,
                    reg2 = /^[0-9a-zA-Z]{6,12}$/;
                if( reg1.test(name) && reg2.test(pass) ){
                    let session = JSON.parse(sessionStorage.getItem('user'));
                    console.log(session)
                    if(session && session.length!==0){
                        session.forEach( item=> {
                            if(item.name===name){
                                console.log(name,item.name)
                                Toast({
                                    message: '该昵称已被占用',
                                    position: 'middle',
                                    duration: 2000,
                                });
                            }else{
                                this.info.push({name:name,passWord:pass})
                                sessionStorage.setItem('user',JSON.stringify(this.info));
                                Toast({
                                    message: '注册成功',
                                    iconClass: 'fa fa-check-square',
                                    duration: 1500,
                                });
                               
                                    this.$router.push({path:'/login',query:{username:name,password:pass}});   
                        }
                    })
                    }else{
                        this.info.push({name:name,passWord:pass});
                        sessionStorage.setItem('user',JSON.stringify(this.info));
                        this.$router.push({path:'/login',query:{username:name,password:pass}});  
                    }
                    
                }else{
                    Toast({
                         message: '输入有误，请重新输入',
                         position: 'middle',
                         duration: 2000,
                    });
                }
            }else{
                Toast({
                         message: '输入不能为空，请重新输入',
                         position: 'middle',
                         duration: 2000,
                         iconClass: 'fa fa-warning'
                    });
            }
        },
        showTishi(val){
        if(val==='name'){
            this.nameTishi="请输入3-6位汉字、字母或数字";
        }else{
            this.passTishi="请输入6-12位字母、数字或字符";
            
        }
    },
    Nothishi(){
        this.passTishi="";
        this.nameTishi="";
    }
    },
    
}
</script>