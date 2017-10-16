import React from 'react';
import {Link,IndexLink} from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Register extends React.Component{
    constructor(props){
        super(props)
    }

    back(){
        window.history.go(-1);
    }

    render(){
        return (
            <div id = 'container' className = 'container'>
                <div className = 'type'>
                    <header id = 'registerHeader' className = 'registerHeader'>
                        <button className = 'iconfont' onClick = {this.back.bind(this)}>&#xe64b;</button>
                    </header>
                    <div id = "registerContent" className = 'registerContent'>
                        <form className = 'registerForm'>
                            <div className = 'registerText1'>
                                <input id = 'registerName1' type = 'text' placeholder = '请输入手机号'/>
                                <p className = 'phoneYZM'>获取邀请码</p>
                            </div>
                            <div className = 'registerText2'>
                                <input id = 'registerName2' type = 'text' placeholder = '请输入邀请码'/>
                            </div>
                            <div className = 'registerPwd1'>
                                <input id = 'registerPass1' type = 'password' placeholder = '请输入密码'/>
                            </div>
                            <div className = 'registerPwd2'>
                                <input id = 'registerPass2' type = 'password' placeholder = '请再次输入密码'/>
                            </div>
                            <div className = 'registerYZM'>
                                <input type = 'text' placeholder = '请输入验证码'/>
                                <a href = 'javascript:;'>验证码</a>
                            </div>
                        </form>
                        
                        <div className = 'registerTZ'>
                            <button className = 'registerRgtBtn'>立即注册</button>
                        </div>
                        <div className = 'xieyi'>点击注册，即代表同意《易果服务协议》</div>
                    </div>
                </div>
            </div>      
        )
    }

    componentDidMount(){
        console.log('1111');
        $(".registerRgtBtn").on('tap',function(){
            let userName = $("#registerName1").val();
            let userPwd = $("#registerPass1").val();
            let yanzheng = $("#registerPass2").val();
            let testingName = /^\d{1,11}$/;
            let testingPwd = /^[a-zA-Z]{1,16}$/;
            
            if(testingName.test(userName) && testingPwd.test(userPwd) && userPwd == yanzheng){
                $.ajax({
                    method:"get",
                    url:'http://localhost:3000/users/register',
                    timeout:10000,
                    data:{
                        userName:userName,
                        userPwd:userPwd
                    },
                    beforeSend:function(){
                        $(".registerRgtBtn").attr('value','正在注册...')
                        $(".registerRgtBtn").removeAttr('disabled');
                    },
                    success:function(data){
                        alert(data);
                        $(".registerName1").val('');
                        $(".registerPass1").val('');
                        $(".registerPass2").val('');
                        if(data == '注册成功'){
                            let cartdata = [{"user":userName}];
                            localStorage.setItem('myCart',cartdata);
                            localStorage.setItem('login',userName)
                            let url = localStorage.getItem('fanhui');
                            window.location.href = url;
                        }
                    },
                    complete:function(){
                        $(".registerRgtBtn").attr('value','立即注册')
                        $(".registerRgtBtn").removeAttr('disabled');
                    }
                })
            }else{
                alert("用户名或者密码格式输入错误");
            }
                
        })
    }
}