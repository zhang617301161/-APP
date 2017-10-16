import React from "react";
import {Link, hashHistory} from "react-router";
import MyAjax from './MyAjax.js';
export default class Detail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            shopdata : '',
        }
        
    }

    back(){
        window.history.go(-1);
    }

    componentWillMount(){
        let that = this;
        let str =window.location.href;
        console.log(str);
        let id = str.split('=')[1];
        console.log(id);
        let url = './../json/'+id+'.json';
        $.ajax({
            url:url,
            type:'get',
            dataType:'json',
            success:function(res){
                that.setState({
                    shopdata:res
                })
            }
        })
        
    }

    render(){
        let res = this.state.shopdata;
        if(res == ''){
            return (
                <div className = 'type'>

                    <div className = 'loading'>
                        loading...
                    </div>
                </div>
            )
        }else{
            console.log(res);
            let ary1 = [];
            for(let i in res.RspData.data.Pictures){
                ary1.push(
                    <div key = {i} className = 'swiper-slide'>
                        <img src = {res.RspData.data.Pictures[i]} />
                    </div>
                )
            }

            let ary2 = [];
            for(let i in res.RspData.data.Description){
                ary2.push(<li key = {i} className = 'detailImgItem'><img src = {res.RspData.data.Description[i]} /></li>)
            }




            return (
                <div id = 'container' className = 'container'>
                    <div className = 'type'>
                        <header id = 'detailHeader' className = 'detailHeader'></header>
                        <div id = "detailContent" className = 'detailContent'>
                            <div className = 'detailBanner'>
                                <a href = 'javascript:;' className = 'iconfont detailBack' onClick = {this.back.bind(this)}>&#xe64b;</a>
                                <div className = 'swiper-container' id = 'swiper-container'>
                                    <div className = 'swiper-wrapper'>
                                        {ary1}
                                    </div>
                                    <div className = 'swiper-pagination' id = 'swiper-pagination'></div>
                                </div>
                            </div>
                            <div className = 'product-info'>
                                <h2>{res.RspData.data.CommodityName}</h2>
                                <span>￥{res.RspData.data.CommodityPrice}</span>
                                <div className = 'shopNum'>
                                    <button className = 'leftDelBtn'>-</button><input className = 'shopDelNum' type = 'text' defaultValue = '1'/><button className = 'rightDelBtn'>+</button>
                                </div>
                            </div>
                            <div className = 'sevenDay'>{res.RspData.data.CanNoReasonToReturnText}</div>
                            <div className = 'product-choose'>
                                <span>规格</span><b>{res.RspData.data.Spec}</b>
                            </div>
                            <div className = 'product-other-wrap'>
                                <p>产地 &emsp;<span> {res.RspData.data.PlaceOfOrigin}</span></p>
                                <b>{res.RspData.data.DeliveryTips}</b>
                            </div>
                            <a href = 'javascript:;' className = 'pingjia'>
                                <span>用户评价（{res.RspData.voteCount}）</span>
                                <i className = 'iconfont'>&#xe665;</i>
                                <b><em>{res.RspData.voteRate}</em>好评</b>
                            </a>
                            <a href = 'javascript:;' className = 'tuwen'>
                                <span>商品图文详情（建议在WIFI下观看）</span>
                                <i className = 'iconfont'>&#xe665;</i>
                            </a>
                            <ul className = 'detailImgList'>
                                {/*<li><img src = {} /></li>*/}
                                {ary2}
                            </ul>



                            <div className = 'shoppingCart'>
                                <Link to = '/' className = 'detailHome iconfont'>&#xe65a;</Link>
                                <Link to = '/cart' className = 'detailCart iconfont'>&#xe627;</Link>
                                <button className = 'joinCart'>加入购物车</button>
                            </div>
                        </div>
                    </div>
                </div>
                    
            )
        }

            
    }

    componentDidUpdate(){
        let res = this.state.shopdata;
        let MySwiper1 = new Swiper('#swiper-container',{
            pagination:'#swiper-pagination',
            loop:true,
            autoplayDisableOnInteraction:false
        });

        $('.leftDelBtn').on('tap',function(){
            let nowNum = $('.shopDelNum').val()
            if(nowNum <= 1){
                nowNum = 1;
                $('.shopDelNum').val(nowNum);
            }else{
                nowNum--;
                $('.shopDelNum').val(nowNum);
            }
        });

        $('.rightDelBtn').on('tap',function(){
            let nowNum = $('.shopDelNum').val()
            if(nowNum >= 99){
                nowNum = 99;
                $('.shopDelNum').val(nowNum);
            }else{
                nowNum++;
                $('.shopDelNum').val(nowNum);
            }
        });
        $('.shopDelNum').blur(function(){
            let nowNum = $('.shopDelNum').val();
            let zzyz = /^\d{1,2}$/
            console.log(typeof(nowNum));
            if(zzyz.test(nowNum)){
                if(nowNum>=99){
                    nowNum = 99;
                }
                if(nowNum<=1){
                    nowNum = 1;
                }
                $('.shopDelNum').val(nowNum)
            }else{
                nowNum = 1;
                $('.shopDelNum').val(nowNum);
            }
        })

        let flag1 = true;
        
        $('.tuwen').on('tap',function(){
            if(flag1 == true){
                $('.detailImgList').css('display','block');
                $(this).find('i').html('&#xe61a;')
                flag1 = false;
            }else{
                $('.detailImgList').css('display','none');
                $(this).find('i').html('&#xe665;');
                flag1 = true;
            }
        })







        //加入购物车
        $('.joinCart').on('tap',function(){
            let userName = localStorage.getItem('login');
            if(userName == null || userName == ''){
                let str =window.location.href;
                let id = str.split('=')[1];
                let url = './../json/'+id+'.json';
                localStorage.setItem('fanhui','http://localhost:8080/#/detail?id='+id);
                window.location.href='http://localhost:8080/#/login';
            }else{
                let shopId = ""+res.RspData.data.CommodityCode;
                let shopnum = $('.shopDelNum').val();
                let shopname = ""+res.RspData.data.CommodityName;
                let shopJG = ""+res.RspData.data.CommodityPrice;
                let shopImg = ""+res.RspData.data.Pictures[0];
                let shopMsg = {
                    userName:userName,
                    id : shopId,
                    num:shopnum,
                    name:shopname,
                    price:shopJG,
                    img:shopImg
                }
                console.log(shopMsg);
                $.ajax({
                    url:'http://localhost:3000/cart/add',
                    method:"get",
                    data:shopMsg,
                    success:function(data){
                        console.log(data);
                    }
                })
            }
        })

    }
}
