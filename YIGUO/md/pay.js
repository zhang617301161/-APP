import React from 'react';
import {Link,IndexLink} from 'react-router';

export default class Pay extends React.Component{
    constructor(props){
        super(props)
    }

    back(){
        window.history.go(-1)
    }

    render(){
        return (
            <div className = 'payType'>
                <header id = 'payHeader' className = 'payHeader'>
                    <button className = 'iconfont' onClick = {this.back.bind(this)}>&#xe64b;</button>支付
                
                </header>
                <div id = "payContent" className = 'payContent'>
                    <div className = 'payImg'>
                        <img src = '../img/pay1.png' />
                    </div>
                </div>
            </div>
        )
    }
}