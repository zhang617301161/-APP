import React from 'react';
import {Link,IndexLink} from 'react-router';

export default class Map extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            cityList:''
        }
    }

    componentWillMount(){
        let that = this;

        $.ajax({
            url:'./../json/map.json',
            method:"get",
            dataType:'json',
            success:function(res){
                // console.log(res);
                let data = res.RspData.data;
                that.setState({
                    cityList:data
                })
            },
            error:function(err){
                console.log(err);
            }
        })

    }

    back(){
        window.history.go(-1)
    }

    render(){
        let data = this.state.cityList;
        if(data == '' || data == []){
            return (
                <div className = 'mapType'>
                    <div className = 'loading'>loading...</div>
                </div>
            )
        }else{
            let data1 = data.CityList;
            let data2 = data.HotCityList;
            // console.log(data1,data2);
            let ary1 = [];
            let ary2 = [];
            for(let i in data2){
                ary1.push(<li key = {i} className = 'cityItem'>
                                <a href = 'javascript:;'>{data2[i].Name}</a>
                        </li>)
            }
            let arr1 = [],
                arr2 = [],
                arr3 = [],
                arr4 = [],
                arr5 = [],
                arr6 = [],
                arr7 = [],
                arr8 = [],
                arr9 = [],
                arr10 = [],
                arr11 = [],
                arr12 = [],
                arr13 = [],
                arr14 = [],
                arr15 = [],
                arr16 = [],
                arr17 = [],
                arr18 = [],
                arr19 = [],
                arr20 = [];

            for(let i in data1){
                switch (data1[i].PY){
                    case 'A':
                        arr1.push({name:data1[i].Name,PY:data1[i].PY});
                        continue;
                    case 'B':
                        arr2.push({name:data1[i].Name,PY:data1[i].PY});
                        continue;
                    case 'C':
                        arr3.push({name:data1[i].Name,PY:data1[i].PY});
                        continue;
                    case 'D':
                        arr4.push({name:data1[i].Name,PY:data1[i].PY});
                        continue;
                    case 'F':
                        arr5.push({name:data1[i].Name,PY:data1[i].PY});
                        continue;
                    case 'G':
                        arr6.push({name:data1[i].Name,PY:data1[i].PY});
                        continue;
                    case 'H':
                        arr7.push({name:data1[i].Name,PY:data1[i].PY});
                        continue;
                    case 'J':
                        arr8.push({name:data1[i].Name,PY:data1[i].PY});
                        continue;
                    case 'K':
                        arr9.push({name:data1[i].Name,PY:data1[i].PY});
                        continue;
                    case 'L':
                        arr10.push({name:data1[i].Name,PY:data1[i].PY});
                        continue;
                    case 'M':
                        arr11.push({name:data1[i].Name,PY:data1[i].PY});
                        continue;
                    case 'N':
                        arr12.push({name:data1[i].Name,PY:data1[i].PY});
                        continue;
                    case 'Q':
                        arr13.push({name:data1[i].Name,PY:data1[i].PY});
                        continue;
                    case 'R':
                        arr14.push({name:data1[i].Name,PY:data1[i].PY});
                        continue;
                    case 'S':
                        arr15.push({name:data1[i].Name,PY:data1[i].PY});
                        continue;
                    case 'T':
                        arr16.push({name:data1[i].Name,PY:data1[i].PY});
                        continue;
                    case 'W':
                        arr17.push({name:data1[i].Name,PY:data1[i].PY});
                        continue;
                    case 'X':
                        arr18.push({name:data1[i].Name,PY:data1[i].PY});
                        continue;
                    case 'Y':
                        arr19.push({name:data1[i].Name,PY:data1[i].PY});
                        continue;
                    case 'Z':
                        arr20.push({name:data1[i].Name,PY:data1[i].PY});
                        continue;
                }
            }
            ary2.push(arr1);
            ary2.push(arr2);
            ary2.push(arr3);
            ary2.push(arr4);
            ary2.push(arr5);
            ary2.push(arr6);
            ary2.push(arr7);
            ary2.push(arr8);
            ary2.push(arr9);
            ary2.push(arr10);
            ary2.push(arr11);
            ary2.push(arr12);
            ary2.push(arr13);
            ary2.push(arr14);
            ary2.push(arr15);
            ary2.push(arr16);
            ary2.push(arr17);
            ary2.push(arr18);
            ary2.push(arr19);
            ary2.push(arr20);

            // console.log(ary2);

            let ary3 = [];
            for(let i =0;i<ary2.length;i++){
                let array = [];
                for(let j=0;j<ary2[i].length;j++){
                    array.push(
                        <li key ={j} className = 'cityList'><a href = 'javascript:;'>{ary2[i][j].name}</a></li>
                    )
                }



                ary3.push(
                    <li key = {i}>
                        <ul>
                            <h4>{ary2[i][0].PY}</h4>
                            {array}
                        </ul>
                    </li>

                )
            }

            


            return (
                <div className = 'mapType'>
                    <header id = 'mapHeader' className = 'mapHeader'>
                        <button className = 'iconfont' onClick = {this.back.bind(this)}>&#xe64b;</button>
                        选择城市
                    </header>
                    <div id = "mapContent" className = 'mapContent'>
                        <ul className = 'selfCity'>
                            <h3 className = 'cityTitle'>自配城市</h3>
                            {/*<li className = 'cityItem'>
                                <a href = 'javascript:;'>{}</a>
                            </li>*/}
                            {ary1}
                        </ul>
                        <ul className = 'cityLIst'>
                            <h3>全部城市(各城市所能选购的商品不同，请正确选择送达城市)</h3>
                            {/*<li>
                                    <ul>
                                        <h4></h4>
                                        <li className = 'cityList'><a href = 'javascript:;'>{}</a></li>
                                    </ul>
                                </li>*/}
                                {ary3}

        
                        </ul>
                    </div>
                </div>
            )
        }  
    }

    componentDidUpdate(){
        $('.cityItem').on('tap',function(){
            let cityName = $(this).find('a').html();
            localStorage.setItem('city',cityName);
            window.location.href = 'http://localhost:8080/'
        })
        $('.cityList').on('tap',function(){
            let cityName = $(this).find('a').html();
            localStorage.setItem('city',cityName);
            let url1 =window.location.href;
            let url = url1.split('#')[0];
            window.location.href= url;
        })

        let city = localStorage.getItem('city');
        for(let i = 0;i<$('.cityItem').length;i++){
            if($('.cityItem').eq(i).find('a').html() == city){
                $('.cityItem').eq(i).css('background','#00FDFF')
            }
        }
        for(let i = 0;i<$('.cityList').length;i++){
            if($('.cityList').eq(i).find('a').html() == city){
                $('.cityList').eq(i).css('background','#00FDFF')
            }
        }
    }
}