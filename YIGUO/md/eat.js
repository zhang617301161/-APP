import React from 'react';
import {Link,IndexLink} from 'react-router';

export default class Eat extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className = 'type'>
                <header id = 'eatHeader' className = 'eatHeader'>备份</header>
                <div id = "eatContent" className = 'eatContent'>
                    数据无法拿到，暂时不写
                </div>
            </div>
        )
    }
}