import React from 'react';
import {Link,IndexLink} from 'react-router';

import MyAjax from './MyAjax.js';


export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            shopdata : ''
        }
    }

    componentWillMount(){
        
        let that = this;
        let obj = {
            url:'http://h5homeapi.yiguo.com/api/Template/GetTemplate',
            data:{
                Area:{
                    Code:16,
                    DId:"8d1dca29-fcf9-43df-a738-af61e9e7eec6",
                    DName:"金水区",
                    Default:0,
                    Id:"2aac03c9-daf1-4aa8-9505-0bc169742e8a",
                    Name:"郑州",
                    Version:"2.0"
                },
                Channel:5
            },
            dataType:'json'
        }
        

        MyAjax.ajaxPost(obj,function(res){
            that.setState({
                shopdata : res.data.template.componentList
            })
        })
        
    }

    selectCity(){
        let url1 =window.location.href;
        let url = url1.split('#')[0];
        window.location.href = url+'#/map';
    }

    render(){
        let data = this.state.shopdata;
        if(data != ""){
            
            let res1 = [];
            let res2 = [];
            let res3 = [];
            let res4 = [];
            let res5 = [];
            let res6 = [];
            let res7 = [];
            for(let i in data){
                
                if(data[i].componentBase.checkCode == '1000000'){
                    res1.push(data[i]);
                }
                if(data[i].componentBase.checkCode == '1000006'){
                    res2.push(data[i]);
                }
                if(data[i].componentBase.checkCode == '1000002'){
                    res3.push(data[i]);
                }
                if(data[i].componentBase.checkCode == '1000004'){
                    res4.push(data[i]);
                }
                if(data[i].componentBase.checkCode == '1000005'){
                    res5.push(data[i]);
                }
                if(data[i].componentBase.checkCode == '1000007'){
                    res6.push(data[i]);
                }
                if(data[i].componentBase.checkCode == '1000009'){
                    res7.push(data[i]);
                }
            };
            // console.log(res1,res2,res3,res4,res5,res6,res7);


            let ary1 = [];
            let ary2 = [];
            let ary3 = [];
            let ary4 = [];
            let ary5 = [];
            let ary6 = [];
            let ary7 = [];
            for(let n in res1){
                let data1 = res1[0].carouselPictures;
                for(let i in data1){
                    ary1.push(<div className = 'swiper-slide' key = {i}>
                        <Link to = '/detail'>
                            <img src = {data1[i].pictureUrl} />
                        </Link>
                        </div>)
                }
                let data2 = data[0].componentNavs;
                for(let i in data2){

                    ary2.push(<Link to = '#' key = {i}><i><img src = {data2[i].pictureUrl} /></i><span>{data2[i].navName}</span></Link>)
                }
                let data3 = data[0].fastReports;
                for(let i in data3){
                    ary3.push(<div key = {i} className = 'swiper-slide'><Link to = '#'>
                        {data3[i].fastReportTitle}
                    </Link></div>)
                }
            }

            
            
            
            let data4 = [];
            data4.push(data[1]);
            data4.push(data[2]);
            data4.push(data[3]);
            data4.push(data[4]);
            data4.push(data[5]);
           
            
            for(let i in res2){
                let array = [];
                for(let j in res2[i].componentCommoditys){
                    let shop = res2[i].componentCommoditys[j];
                    let index = shop.commodityCode;
                    array.push(<li key = {j} className = 'proitem'><Link to = {{pathname:'/detail',query:{id:index}}} >
                        <span>
                            <i className = 'tag'><img src = {shop.cornerPictureUrl}/></i>
                            <strong><img src = {shop.pictureUrl} /></strong>
                        </span>
                        <p>{shop.commodityName}</p>
                        <em><b>￥{shop.commodityPrice}</b>{shop.commoditySpec}</em>
                    </Link></li>)
                }

                ary4.push(
                <div key = {i} className = 'product-List'>
                    <Link to = '#' className = 'proitemImg' >
                        <img src = {res2[i].adPictures[0].pictureUrl} />
                    </Link>
                    <ul className = 'proitemList'>
                        {array}
                        <li className = 'proitem'><Link to = '#' className = 'iconfont proitemMore'>查看更多&#xe630;</Link></li>
                    </ul>
                </div>
                )
            }

            for(let n in res3){
                let data5 = res3[n].adPictures;
                for(let i in data5){
                    ary5.push(<Link key = {i} to = '#' ><img src = {data5[i].pictureUrl}/></Link>)
                }
            }
                
            for(let n in res4){
                let data6 = res4[n].componentCommoditys;
                for(let i in data6){
                    ary6.push(<li key = {i} data-cid = {data6[i].commodityId} className = 'blockwrap'>
                        <div><Link to = {{pathname:'/detail',query:{id:'104135'}}}><img src = {data6[i].pictureUrl}/></Link></div>
                        <p><Link to = {{pathname:'/detail',query:{id:'104135'}}}>{data6[i].commodityName}<i>{data6[i].subTitle}</i></Link><span><b>￥{data6[i].commodityPrice}</b>{data6[i].commoditySpec}</span></p>
                    </li>)
                }
            }
                
            for(let n in res5){
                let arry = []

                let data7 = res5[n];
                for(let i in data7.componentCommoditys){
                    let shop = data7.componentCommoditys[i];
                    arry.push(
                        <li key = {i} className = 'SOEItem' data-cid = {shop.commodityId}>
                            <Link to = '#'>
                                <span><i className = 'tag'><img src = {shop.cornerPictureUrl}/></i><strong><img src = {shop.pictureUrl}/></strong></span>
                                <b>{shop.commodityName}</b>
                                <p><em>￥{shop.commodityPrice} </em>{shop.commoditySpec}</p>
                            </Link>
                        </li>
                    )
                }

                ary7.push(<div key = {n} className = 'SOE'>
                    <h1 className = 'SOETitle'>－－•{res5[n].componentBase.customComponentName}•－－</h1>
                    <ul className = 'SOEList'>
                        {arry}
                    </ul>
                </div>
                )

                
            }
                
            let city = localStorage.getItem('city');


            return (
                <div className = 'type'>
                    <header id = 'homeHeader' className = 'homeHeader'>
                        <div className = 'homePosin iconfont' onClick = {this.selectCity.bind(this)} >{city} &#xe604;</div>
                        <form className = 'homeSeach'>
                            <Link to = '/kind' className = 'iconfont homeBtn'>&#xe69b;</Link>
                            <Link to = '/kind' className = 'homeText'></Link>
                        </form>
                    </header>
                    <div id = "homeContent" className = 'homeContent'>
                        <div className = 'homeBanner'>
                            <div className = 'swiper-container' id = 'homeBanner'>
                                <div className = 'swiper-wrapper' id = 'swiper-wrapper'>
                                    {ary1}
                                </div>
                                <div className = 'swiper-pagination' id = 'swiper-pagination'></div>
                            </div>
                            {/*<div className = 'screen-ad'>
                                <Link to = '#' ><img src = {res1[0].adPictures[0].pictureUrl}/></Link>
                            </div>*/}
                            <div className = 'screen-menu'>
                                {ary2}
                            </div>
                            <div className = 'screen-news'>
                                <i></i>
                                <div className = 'swiper-container' id = 'swiper-container'>
                                    <div className = 'swiper-wrapper' id = 'swiper-wrapper'>
                                        {ary3}
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className = 'homeGroup'>
                            {ary4}
                        </div>
                        <div className = 'food-renking'>
                            {ary5}
                        </div>
                        <div className = 'longxia'>
                            <ul>
                                {ary6}
                            </ul>
                        </div>
                        <div className = 'seafootOrEgg'>
                            {ary7}
                        </div>
                        <div className = 'pageFooter'>
                            <p>沪IPC备09008015号</p>
                            <p>上海易果电子商务有限公司</p>
                        </div>
                        {/*<div className = 'downloadAPP'>
                            <a href = {res6[0].adPictures[0].hrefValue}>
                                <img src = {res6[0].adPictures[0].pictureUrl} />
                            </a>
                            <i className = 'iconfont closeDown'>&#xe695;</i>
                        </div>*/}
                    </div>
                </div>
            )
        }else{
            return (
                <div className = 'type'>

                    <div className = 'loading'>
                        loading...
                    </div>
                </div>
            )
        }



        
    }

    componentDidUpdate(){
        $('.loading').css({display:'none'});
        let MySwiper1 = new Swiper('#homeBanner',{
            pagination:'#swiper-pagination',
            autoplay:3000,
            loop:true,
            autoplayDisableOnInteraction:false
        });

        let MySwiper2 = new Swiper('#swiper-container',{
            autoplay:3000,
            loop:true,
            autoplayDisableOnInteraction:false,
            direction:'vertical'
        });
        
        //让没有图片链接的img隐藏
        for(let i = 0;i<$('.tag').length;i++){
            if($(".tag").eq(i).find('img').attr('src') == ''){
                $(".tag").eq(i).css({display:'none'})
            }
            
        }

        $(".closeDown").on('tap',function(event){
            event.stopPropagation();
            
            $(this).parent().css({display:"none"})
        })
    }
}