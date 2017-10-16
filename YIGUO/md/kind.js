import React from 'react';
import {Link,IndexLink} from 'react-router';

import MyAjax from './MyAjax.js'

export default class Kind extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            menudata:[]
        }
    }

    componentWillMount(){
        let that = this;
        $.ajax({
            url:'./../msg/menu.json',
            type:'get',
            dataType:'json',
            success:function(data){
                that.setState({
                    menudata:data
                })
            },
            error:function(err){
                console.log(err);
            }
        })
    }

    render(){
        let menuData = this.state.menudata;
        if(menuData != ''){
            let data = menuData.RspData.data
            //console.log(data);
            let ary1 = [];
            for(let i in data){

                let array = [];
                for(let j in data[i].Childs){
                    let shop = data[i].Childs[j];
                    let url = 'javascript:;';
                    var url = 'http://weixin.m.yiguo.com/products/'+shop.CategoryCode+'.html'
                    array.push(
                        <a key = {j+1}  href = {url}  >{shop.CategoryName}</a>
                    )
                }

                ary1.push(
                    <li key = {i} className = 'kindItem'>
                        <div className = 'kindItem1'>
                            <i className = 'icon'></i>
                            <div>
                                <h3>{data[i].CategoryName}</h3>
                                <p>{data[i].Description}</p>
                            </div>
                            <span className = 'iconfont'>&#xe675;</span>
                        </div>
                        <div className = 'kindItem2'>
                            <Link key = '1'  to = 'javascript:;' >全部</Link>
                            {array}
                        </div>
                    </li>
                )

            }




            return (
                <div className = 'type'>
                    <header id = 'seachHeader' className = 'seachHeader'>
                        <form>
                            <button className = 'seachBtn iconfont'>&#xe638;</button>
                            <input type = 'text' className = 'seachText' placeholder = '请输入商品名称' />
                        </form>
                        <a className = 'seachOrCancel'>搜索</a>
                    </header>
                    <div id = "seachContent" className = 'seachContent'>
                        <ul className = 'kindResult'>
                            
                        </ul>
                        <ul className = 'kindList'>
                            {ary1}
                        </ul>
                    </div>
                </div>
            )
        }else{
            return(
                <div className = 'type'>
                    <div className = 'loading'>loading...</div>
                </div>
            )      
        }      
    }

    componentDidUpdate(){
        let view1 = true;
        $(".kindItem1").on('tap',function(){
            //console.log('111');
            if(view1 == true){
                $(this).next('.kindItem2').css({display:'block'});
                $(this).find('span').html('&#xe604;');
                view1 = false;
            }else{
                $(this).next('.kindItem2').css({display:'none'});
                $(this).find('span').html('&#xe675;');
                view1 = true;
            }
        })
        $('.seachText').keyup(function(event) {
            let content = $(this).val()
            $('.kindResult').html('')
            $.ajax({
                url :'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+content+'&cb=?',
                type:'GET',
                dataType:'jsonp',
                success:function(data){
                    console.log(data);
                    for(let i = 0; i<data.s.length;i++){
                        console.log(data.s[i]);
                        $('.kindResult').append('<li class = "kindResultList">'+data.s[i]+'</li>');
                    }

                    $('.kindResultList').on('tap',function(){
                        $('.seachText').val($(this).html());
                        $('.kindResult').html('');
                    })
                }
            })
        });

    }
}