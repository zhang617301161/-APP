import React from 'react';
import {Link,IndexLink} from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Back extends React.Component{
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
                    <header id = 'backHeader' className = 'backHeader'>
                        <button className = 'iconfont' onClick = {this.back.bind(this)}>&#xe64b;</button>
                    </header>
                    <div id = "backContent" className = 'backContent'>
                        <form className = 'backForm'>
                            <div className = 'backText1'>
                                <input id = 'backName1' type = 'text' placeholder = '请输入手机号'/>
                            </div>
                            <div className = 'backPwd1'>
                                <input id = 'backPass1' type = 'password' placeholder = '请输入原密码'/>
                            </div>
                            <div className = 'backPwd2'>
                                <input id = 'backPass2' type = 'password' placeholder = '请输入新密码'/>
                            </div>
                            <div className = 'backYZM'>
                                <input type = 'text' placeholder = '请输入验证码'/>
                                <a href = 'javascript:;'>验证码</a>
                            </div>
                        </form>
                        
                        <div className = 'backTZ'>
                            <button className = 'backRgtBtn'>点击找回</button>
                        </div>
                    </div>
                </div>
            </div>      
        )
    }

    componentDidMount(){
        console.log('1111');
        $(".backRgtBtn").click(function(){
            var userName = $("#backName1").val();
            var userPwd = $("#backPass1").val();
            var newPwd = $("#backPass2").val()
            var testingName = /^\d{1,11}$/;
            var testingPwd = /^[a-zA-Z]{1,16}$/;
            
            if(testingName.test(userName) && testingPwd.test(userPwd) && testingPwd.test(newPwd)){
                $.ajax({
                    method:"get",
                    url:'http://localhost:3000/users/back',
                    timeout:10000,
                    data:{
                        userName:userName,
                        userPwd:userPwd,
                        newPwd:newPwd
                    },
                    beforeSend:function(){
                        $(".backRgtBtn").attr('value','正在更改...')
                        $(".backRgtBtn").removeAttr('disabled');
                    },
                    success:function(data){
                        alert(data);
                        $("#backName1").val('');
                        $("#backPass1").val('');
                        $("#backPass2").val('');
                        if(data == "更改密码成功"){
                            let cartdata = [{"user":userName}];
                            localStorage.setItem('myCart',cartdata);
                            localStorage.setItem('login',userName)
                            let url = localStorage.getItem('fanhui');
                            window.location.href = url;
                        }
                    },
                    complete:function(){
                        $(".backRgtBtn").attr('value','找回')
                        $(".backRgtBtn").removeAttr('disabled');
                    }
                })
            }else{
                alert("用户名或者密码格式输入错误");
            }
                
        })
    }
}