import React from 'react';
import ReactDOM from 'react-dom';

import './scss/main.scss';

import {Router,Route,hashHistory,Link,IndexRoute} from 'react-router';

import App from './md/App.js';
import Home from './md/home.js';
import Kind from './md/kind.js';
import Cart from './md/cart.js';
import User from './md/user.js';
import Detail from './md/detail.js';
import Eat from './md/eat.js';
import Login from './md/login.js';
import Register from './md/register.js';
import Back from './md/back.js';
import Pay from './md/pay.js';
import Map from './md/map.js';
//import Seach from './md/seach.js';

ReactDOM.render((
    <Router history = {hashHistory}>
        <Route path = '/' component = {App}>
            <IndexRoute components = {{type:Home}} />
            <Route path = 'kind' components = {{type:Kind}} />
            <Route path = 'eat' components = {{type:Eat}} />
            <Route path = 'cart' components = {{type:Cart}} />
            <Route path = 'user' components = {{type:User}} />
        </Route>
        <Route path = '/detail' component = {Detail}></Route>
        <Route path = '/back' component = {Back}></Route>
        <Route path = '/login' component = {Login}></Route>
        <Route path = '/register' component = {Register}></Route>
        <Route path = '/pay' component = {Pay}></Route>
        <Route path = '/map' component = {Map}></Route>
    </Router>
),document.getElementById('app'))