import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Switch, Route,Redirect} from 'react-router-dom'
import App from './App';
import {mainRoutes} from './routes/index.js'
import reportWebVitals from './reportWebVitals';
import {message} from 'antd'
import './index.css';
message.config({
  maxCount: 1,
});
window.addEventListener('hashchange' , () => {
  const userInfo = window.localStorage.getItem('ts_token')
  if (!userInfo) {
    window.location.href = '/#/login'
    message.loading('您似乎还没有登录，请登录', 3  )
  }
})
ReactDOM.render(
    <Router>
      <Switch>
        <Route path="/admin" render={ routeprops => (<App {...routeprops}></App>) }></Route>
        {mainRoutes.map( item =>  {
          return <Route key={item.path} path={item.path} component={item.component}></Route>
        })}
        <Redirect to='/login' from='/'></Redirect>
        <Redirect to='/404'></Redirect>
      </Switch>
    </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
