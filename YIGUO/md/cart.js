import React from "react";
import {Link, hashHistory} from "react-router";

export default class Cart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            shopdate : ''
        }
        
    }

    componentWillMount(){
        let user = localStorage.getItem('login');
        if(user == null || user == ''){
            this.setState({
                shopdate:''
            })
        }else{
            let that = this;
            let shopMsg = {
                userName:user
            }
            $.ajax({
                url:'http://localhost:3000/cart/inquire',
                method:"get",
                data:shopMsg,
                success:function(data){
                    
                    that.setState({
                        shopdate:data
                    })
                }
            })
        }
    }

    tiaozhuan(){
        let url1 =window.location.href;
        let url = url1.split('#')[0];
        localStorage.setItem('fanhui',url+'#/cart')
        window.location.href= url+'#/login';
    }

    shopping(){
        let url1 =window.location.href;
        let url = url1.split('#')[0];
        window.location.href=url;
    }

    render(){
        let user = localStorage.getItem('login');
        let data = this.state.shopdate;
        if(user == null || user == ''){
            return(
                <div className = 'type'>
                    <header id = 'cartHeader' className = 'cartHeader'>购物车</header>
                    <div id = "cartContent" className = 'cartContent'>
                        <div className = 'noLoginOrData'>
                            <span>对不起！您还没有登录，请点击</span>
                            <button onClick = {this.tiaozhuan.bind(this)}>登录</button>
                        </div>
                    </div>
                </div>
            )     
        }else if(data == '' || data == null || data == []){
            return (
                <div className = 'type'>
                    <header id = 'cartHeader' className = 'cartHeader'>购物车</header>
                    <div id = "cartContent" className = 'cartContent'>
                        <div className = 'noLoginOrData'>
                            <span>您的购物车空空如也哦！<br />快去看看有没有什么喜欢的</span>
                            <button onClick = {this.shopping.bind(this)}>去看看</button>
                        </div>
                    </div>
                </div>
            )
        }else{
            console.log(data)
            let ary1 = []; 
            for(let i in data){
                ary1.push(
                    <li key = {i} className = 'cartShopItem'>
                        <h3 className = 'cartXuanZhong'><b className = 'xuanzhong iconfont'>&#xe653;</b></h3>
                        <div className = 'cartShopItemImg'><img src = {data[i].shopImg} /></div>
                        <div className = 'cartShopItemMsg'>
                            <Link to ={{pathname:'/detail',query:{id:data[i].shopId}}} className = 'cartShopItemName'>{data[i].shopname}</Link>
                            <p className = 'cartShopItemPrice'>单价 ：￥ <b>{data[i].shopJG}</b></p>
                            <div className = 'cartShopItemNum'>
                                <button className = 'cartShopItemNumRed'>-</button>
                                <input className = 'cartShopItemMany' type = 'text' defaultValue = {data[i].shopnum}/>
                                <button className = 'cartShopItemNumAdd'>+</button>
                            </div>
                            <button className = 'dateleShop iconfont'>&#xe6e5;</button>
                        </div>
                    </li>
                )
            }


            return (
                <div className = 'type'>
                    <header id = 'cartHeader' className = 'cartHeader'>购物车</header>
                    <div id = "cartContent" className = 'cartContent'>
                        <div className = 'cartShopList'>
                            <ul>
                                {ary1}
                                {/*<li className = 'cartShopItem'>
                                    <div className = 'cartShopItemImg'><img src = "" /></div>
                                    <div className = 'cartShopItemMsg'>
                                        <h2 className = 'cartShopItemName'>{}</h2>
                                        <p className = 'cartShopItemPrice'>{}</p>
                                        <form className = 'cartShopItemNum'>
                                            <button className = 'cartShopItemNumRed'>-</button>
                                            <input className = 'cartShopItemMany' type = 'text' defaultValue = '1'/>
                                            <button className = 'cartShopItemNumAdd'>+</button>
                                        </form>
                                    </div>
                                </li>*/}
                            </ul>
                        </div>
                        <div className = 'cartSettlement'>
                            <p className = 'allXuan'>
                                <span id = 'allCheckbox' className = 'iconfont'>&#xe651;</span>
                                <b>全选</b>
                            </p>
                            <div className = 'allMoney'>
                                <p>总金额为￥<b className = 'money'>0.00</b></p>
                                <span>含运费</span>
                            </div>
                            <button className = 'Settlement'>结算</button>
                        </div>
                    </div>
                </div>
            )
        }
        
    }

    componentDidUpdate(){
        // $('.cartShopItemNumRed').on('tap',function(){
        //     let nowNum = $('.cartShopItemMany').val()
        //     if(nowNum <= 1){
        //         nowNum = 1;
        //         $('.cartShopItemMany').val(nowNum);
        //     }else{
        //         nowNum--;
        //         $('.cartShopItemMany').val(nowNum);
        //     }
        // });

        // $('.cartShopItemNumAdd').on('tap',function(){
        //     let nowNum = $('.shopDelNum').val()
        //     if(nowNum >= 99){
        //         nowNum = 99;
        //         $('.cartShopItemMany').val(nowNum);
        //     }else{
        //         nowNum++;
        //         $('.cartShopItemMany').val(nowNum);
        //     }
        // });

        let user = localStorage.getItem('login');
        let data = this.state.shopdate;

        $(".cartShopItemNumRed").on('tap',function(){
            let nowNum = $(this).next('input').val();
            if(nowNum <= 1){
                nowNum = 1;
                $(this).next('input').val(nowNum);
            }else{
                nowNum--;
                $(this).next('input').val(nowNum);
                let index = $(this).closest('li').index();
                
                
                let userName = ''+data[index].name;
                let shopId = ''+data[index].shopId;
                let number = ''+nowNum;
                
                $.ajax({
                    url:'http://localhost:3000/cart/change',
                    data:{
                        userName:userName,
                        id:shopId,
                        num:number
                    },
                    success:function(msg){
                        console.log(msg)
                    }
                })
                jiesuan();

            }

        })

        $(".cartShopItemNumAdd").on('tap',function(){
            let nowNum = $(this).prev('input').val()
            if(nowNum >= 99){
                nowNum = 99;
                $(this).prev('input').val(nowNum);
            }else{
                nowNum++;
                $(this).prev('input').val(nowNum);
                let index = $(this).closest('li').index();

                
                let user = ''+data[index].name;
                let shopId = ''+data[index].shopId;
                let number = ''+nowNum;
                
                $.ajax({
                    url:'http://localhost:3000/cart/change',
                    data:{
                        userName:user,
                        id:shopId,
                        num:number
                    },
                    success:function(msg){
                        console.log(msg)
                    }
                })

                
                jiesuan();
            }
        })
        //删除商品
        $('.dateleShop').on('tap',function(){

            let index = $(this).closest('li').index();
            let user = ''+data[index].name;
            let shopId = ''+data[index].shopId;

            $.ajax({
                url:'http://localhost:3000/cart/remove',
                data:{
                    userName:user,
                    id:shopId
                },
                success:function(msg){
                    console.log(msg);
                }
            })
            data.splice(index,1);
            $(this).closest('li').remove();
            jiesuan();
            
            if($(".cartShopItem").length == '0'){
                console.log($(".cartShopItem").length);
                window.location.reload();
            }



        })
        //全选全部订单按钮
        
        //结算函数
        function jiesuan(){
            let prise1 = 0;
            let ary2 = [];
            for(let i = 0;i<$(".cartShopItem").length;i++){
                if($(".cartShopItem").eq(i).find(".xuanzhong").css('color') == 'red'){
                    let number1 = $(".cartShopItem").eq(i).find('.cartShopItemPrice').find('b').html();
                    console.log('数量',number1)
                    let number2 = $(".cartShopItem").eq(i).find('.cartShopItemMany').val();
                    console.log('单价',number2)
                    let prise2 = number1 * number2;
                    ary2.push(prise2);
                }    
            }

            console.log('每个商品价格',ary2)
            for(let i = 0;i<ary2.length;i++){
                prise1 = prise1 + ary2[i];
            }
            console.log('全部商品价格',prise1);

            $('.money').html(prise1.toFixed(2));
            
        }





        let flag1 = true;
        $('#allCheckbox').on('tap',function(){
            if(flag1 == true){
                $(this).css({color:'red'});
                $('.cartShopItem').find('.xuanzhong').css({color:'red'})
                let prise1 = 0;
                let ary2 = [];
                for(let i = 0;i<$(".cartShopItem").length;i++){
                    let number1 = $(".cartShopItem").eq(i).find('.cartShopItemPrice').find('b').html();
                    console.log('数量',number1)
                    let number2 = $(".cartShopItem").eq(i).find('.cartShopItemMany').val();
                    console.log('单价',number2)
                    let prise2 = number1 * number2;
                    ary2.push(prise2);
                }
                console.log('每个商品价格',ary2)
                for(let i = 0;i<ary2.length;i++){
                    prise1 = prise1 + ary2[i];
                }
                console.log('全部商品价格',prise1);
                $('.money').html(prise1.toFixed(2));
                
                flag1 = false;
            }else{
                $(this).css({color:'#aaa'});
                $('.cartShopItem').find('.xuanzhong').css({color:'#eee'})
                $('.money').html('0');
                
                flag1 = true;
            }
        })
        
        $(".xuanzhong").on('tap',function(){
            if($(this).css('color') == 'red'){
                $(this).css('color',"#eee");
                $('#allCheckbox').css('color','#aaa');
                jiesuan()

                flag1 = true;
            }else{
                $(this).css('color',"red");
                jiesuan()
            }
        })

        $('.Settlement').on('tap',function(){
            let cartMoney = $('.money').html();
            if(cartMoney == 0){
                alert('金额为0,无法结算')
            }else{
                localStorage.setItem('money',cartMoney);
                let url1 =window.location.href;
                let url = url1.split('#')[0];
                window.location.href=url+'#/pay';
            }
            
        })
    }
}
