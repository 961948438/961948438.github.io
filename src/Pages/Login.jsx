import React, { Component } from 'react'
import { Form, Input, Button, Checkbox ,message,Modal,Result} from 'antd';
import { UserOutlined, LockOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
// import Password from 'antd/lib/input/Password';
import {setToken} from '../utils/auth.js'
import  axios from  'axios'

export default class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            isInitLogin: window.localStorage.getItem('ts_token')?false:true,
            modal1Visible: false,
            isSuccessLogin:  false,
            
        }
    }
    onClose = (value,data) => {
        const {history} = this.props
        window.localStorage.setItem('ts_token',data.token)
        history.push('/admin')
        
    }
    onFinish = (values) => {
        const {history} = this.props
        const {isInitLogin} = this.state
        const {username,password} = values
        let  userinfo = window.localStorage.getItem('ts_token')
        axios.post('/api2/reactlogin',values).then(r => {
            console.log(r)
            if(r.data.code === 298) {
                return message.error('Account not registered!',3)
            } else  if(r.data.code === 299) {
                return message.error('The user password is incorrect',3)
            } else {
                this.setState({isSuccessLogin:true})
                return  message.loading('Loading in progress!', 5, this.onClose.bind(this,values,r.data))
            }
        })
        // if(isInitLogin) {
        //     return  message.loading('This is simulation, real user data is stored in sessionStorage!', 3, this.onClose.bind(this,values))
        // }
        // userinfo = JSON.parse(userinfo)
        // if( username===userinfo.username & password === userinfo.password){
        //     history.push('/admin')
        // } else {
        //     message.error('The account password is incorrect!',3)
        // }
        
    };
    setModal1Visible(modal1Visible) {
        this.setState({ modal1Visible });
    }
    onFinishFailed = (errorInfo) => {
        if(errorInfo.errorFields[0])
        console.log('Failed:', errorInfo);
        const error =  errorInfo.errorFields.map( item => (item.errors) )
        message.error(error)
    }
    componentDidMount(){
        this.setModal1Visible(true)
    }
    render() {
        return (
            <div  className='login_content'>
                {
                    !this.state.isSuccessLogin? 
                    <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                    </Form.Item>
                    <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
            
                    <a className="login-form-forgot" href="#" onClick={e => e.preventDefault()}>
                        Forgot password
                    </a>
                    </Form.Item>
            
                    <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="#" onClick={e => e.preventDefault()}>register now!</a>
                    </Form.Item>
                </Form>:<Result
                        status="success"
                        title="Congratulations on your correct information!"
                        subTitle="Your account is admin and your password is 961948438,Looking forward to seeing you again!"
                        extra={[
                        <Button type="primary" key="console" disabled>
                            Cancel the login
                        </Button>,
                        <Button key="buy" disabled>
                            Login immediately
                        </Button>,
                        ]}
                    />
                }
                <Modal
                bodyStyle={{width:800,height:300}}
                title={ <span> <ExclamationCircleOutlined  /> 注意：不会写接口，只提供了几个简单接口！</span>}
                style={{ top: 140}}
                visible={this.state.modal1Visible}
                onOk={() => this.setModal1Visible(false)}
                onCancel={() => this.setModal1Visible(false)}
                >
                    <p>账户：admin</p>
                    <p>密码：961948438</p>
                    <p>add商品接口：http://www.innerjquery.club:5001/reactaddshop</p>
                    <p>注册接口：http://www.innerjquery.club:5001/reactregister</p>
                    <p>获取数据接口：http://www.innerjquery.club:5001/reactfindshop</p>
                    <p>获取总数接口：http://www.innerjquery.club:5001/reactcount</p>
                    <p>删除数据接口：http://www.innerjquery.club:5001/reactRemoveData</p>
                    {/* <p>some contents...</p>
                    <p>some contents...</p> */}
                </Modal>
            </div>
            
        )
    }
}

