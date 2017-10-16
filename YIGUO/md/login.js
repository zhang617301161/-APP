import React from 'react';
import {Link,IndexLink} from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Login extends React.Component{
    constructor(props){
        super(props)
    }

    back(){
        window.history.go(-1);
    }

    register(){
        let url1 =window.location.href;
        let url = url1.split('#')[0];
        window.location.href= url+'#/register';
    }

    render(){
        return (
            <div id = 'container' className = 'container'>
                <div className = 'type'>
                    <header id = 'loginHeader' className = 'loginHeader'>
                        <button className = 'iconfont' onClick = {this.back.bind(this)}>&#xe64b;</button>
                    </header>
                    <div id = "loginContent" className = 'loginContent'>
                        <form className = 'loginForm'>
                            <div className = 'loginText'>
                                <label htmlFor = 'userText' className = 'iconfont'>&#xe644;</label>
                                <input id = 'userText' type = 'text' placeholder = '请输入用户名'/>
                            </div>
                            <div className = 'loginPwd'>
                                <label htmlFor = 'userPwd' className = 'iconfont'>&#xe656;</label>
                                <input id = 'userPwd' type = 'password' placeholder = '请输入密码'/>
                            </div>
                            <div className = 'loginYZM'>
                                <label></label>
                                <input type = 'text' placeholder = '请输入验证码'/>
                                <a href = 'javascript:;'>验证码</a>
                            </div>
                            
                        </form>
                        <Link to = '/back' className = 'forgetPwd'>忘记密码？</Link>
                        <div className = 'btnTZ'>
                            <button className = 'loginBtn'>登录</button>
                            <button onClick = {this.register.bind(this)} className = 'loginRgtBtn'>立即注册</button>
                        </div>
                    </div>
                </div>
            </div>      
        )
    }

    componentDidMount(){
        console.log('1111');
        $(".loginBtn").click(function(){
            var userName = $("#userText").val();
            var userPwd = $("#userPwd").val();
            var testingName = /^\d{1,11}$/;
            var testingPwd = /^[a-zA-Z]{1,16}$/;
            
            if(testingName.test(userName) && testingPwd.test(userPwd)){
                $.ajax({
                    method:"get",
                    url:'http://localhost:3000/users/login',
                    timeout:10000,
                    data:{
                        userName:userName,
                        userPwd:userPwd
                    },
                    beforeSend:function(){
                        $(".loginBtn").attr('value','正在登录...')
                        $(".loginBtn").removeAttr('disabled');
                    },
                    success:function(data){
                        alert(data);
                        $("#userText").val('');
                        $("#userPwd").val('');
                        if(data == '登陆成功'){
                            let cartdata = [{"user":userName}];
                            localStorage.setItem('myCart',cartdata);
                            localStorage.setItem('login',userName)
                            let url = localStorage.getItem('fanhui');
                            window.location.href = url;
                        }
                    },
                    complete:function(){
                        $(".loginBtn").attr('value','登录')
                        $(".loginBtn").removeAttr('disabled');
                    }
                })
            }else{
                alert("用户名或者密码格式输入错误");
            }
                
        })
    }
}