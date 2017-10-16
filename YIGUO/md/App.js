import React from 'react';
import ReactDOM from 'react-dom';
import {Link,IndexLink} from 'react-router';

export default class App extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (

            <div id = 'container' className = 'container'>
                {this.props.type}
                <footer id = 'footer' className = 'footer'>
                    <ul>
                        <li >
                            <IndexLink to = '/' activeClassName = 'active'>
                                <span className = 'iconfont'>&#xe68f;</span>
                                首页
                            </IndexLink>
                        </li>
                        <li>
                            <Link to = '/kind' activeClassName = 'active'>
                                <span className = 'iconfont'>&#xe60b;</span>
                                目录
                            </Link>
                        </li>
                        <li>
                            <Link to = '/eat' activeClassName = 'active'>
                                <img src = 'http://home.m.yiguo.com/Content/images/nav_eat.png' />
                                备份
                            </Link>
                        </li>
                        <li>
                            <Link to = '/cart' activeClassName = 'active'>
                                <span className = 'iconfont'>&#xe60d;</span>
                                购物车
                            </Link>
                        </li>
                        <li>
                            <Link to = '/user' activeClassName = 'active'>
                                <span className = 'iconfont'>&#xe641;</span>
                                我的
                            </Link>
                        </li>
                    </ul>
                </footer>
            </div>
        )
    }
}