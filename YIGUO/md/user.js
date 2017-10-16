import React from 'react';
import {Link,IndexLink} from 'react-router';

export default class User extends React.Component{
    constructor(props){
        super(props)
    }

    tiaozhuan(){
        let url1 =window.location.href;
        let url = url1.split('#')[0];
        localStorage.setItem('fanhui',url+'#/user')
        window.location.href= url+'#/login';
    }


    render(){
        return (
            <div className = 'type'>
                <header id = 'userHeader' className = 'userHeader'>
                    <div className = 'userMsg'>
                        <i className = 'setting iconfont'>&#xe61f;</i>
                        <div className = 'myMsg'>
                            <p className = 'myImg'><img src = 'http://img02.yiguo.com/e/web/150703/00781/140145/no-pic.jpg'/></p>
                            <a href = 'javascript:;' onClick = {this.tiaozhuan.bind(this)} className = 'lgnOrRgt'>登录/注册</a>
                            <div className = 'userBack'><span></span><button className = 'tuichu'>退出</button></div>
                        </div>
                        <ul className = 'account'>
                            <li><a href = 'javascript:;' className = 'balance'><span>--</span>查看余额</a></li>
                            <li><a href = 'javascript:;' className = 'Coupon'><span>--</span>优惠券</a></li>
                            <li><a href = 'javascript:;' className = 'youBi'><span>--</span>悠币</a></li>
                        </ul>
                    </div>
                </header>
                <div id = "userContent" className = 'userContent'></div>
            </div>
        )
    }

    componentDidMount(){
        let userName = localStorage.getItem('login');
        
        if(userName == '' || userName == null){
            $(".lgnOrRgt").css({display:'block'});
            $('.userBack').find('span').html('');
            $('.userBack').css({display:'none'});

        }else{
            $(".lgnOrRgt").css({display:'none'});
            $('.userBack').css({display:'block'});
            $('.userBack').find('span').html(userName);

            
        };
        $('.tuichu').on('tap',function(){
            localStorage.setItem('login','');
            $(".lgnOrRgt").css({display:'block'});
            $('.userBack').find('span').html('');
            $('.userBack').css({display:'none'});
        })

    }

    componentDidUpdate(){
        

    }
}