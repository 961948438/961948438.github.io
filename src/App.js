import React from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'
import {adminRoutes} from './routes/index.js' 
import Frame from './components/Frame/index.jsx'
import { isLogin } from './utils/auth.js'
import 'antd/dist/antd.css'
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  render() {
    console.log('app组件被渲染了')
    return isLogin()?(
      <Frame className="App" >
        <Switch>
          {/* 循环创建路由规则对象，r是每次循环的路由规则对象 */}
          {
            adminRoutes.map(r => {
              return <Route 
              key={r.path} 
              path={r.path} 
              exact={r.exact} render={rprops => {
                return <r.component {...rprops}></r.component>
              }}>
              </Route>
            })
          }
          <Redirect to="/admin/products"   from='/admin' ></Redirect>
        </Switch>
      </Frame>
    ):(
      <Redirect to="/login"></Redirect>
      // ''
    )
  }
}
