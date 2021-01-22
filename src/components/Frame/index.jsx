import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb,Dropdown,notification,Button   } from 'antd';
import {withRouter} from 'react-router-dom'
import { MediumOutlined,CiCircleOutlined, DownOutlined} from '@ant-design/icons';
import {adminRoutes} from '../../routes/index.js'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const routes = adminRoutes.filter((item) => item.isShow )
    class Index extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    close = () => {
        
    };
    openNotification = () => {
        const key = `open${Date.now()}`;
        const btn = (
          <Button type="primary" size="small" onClick={() => {
            notification.close(key);
            const { history } = this.props
            history.push('/login')
          }}>
            Confirm
          </Button>
        );
        notification.open({
          message: '是否退出？',
          description:
            '请注意您的注册账户和密码为初始登录密码！',
          btn,
          key,
          duration:null,
          onClose: this.close,
        });
    }
    render() {
        const { history } = this.props
        const popMenu = (<Menu onClick={ e =>  {
            if(e.key === 'logout')  {
               return this.openNotification()
            } 
            if (e.key === 'note' ) {
                history.push('/admin/notices')
            }
        }}>
            <Menu.Item key="note">通知中心</Menu.Item>
            <Menu.Item key="setting">设置</Menu.Item>
            <Menu.Item key='logout' >退出</Menu.Item>
        </Menu>)
        
        return (
            <Layout>
                <Header className="header">
                <div className="logo" />
                <Menu theme='light'  mode="horizontal" defaultSelectedKeys={['2']} className='meun_head' >
                    <Menu.Item key="1" disabled>未开放...</Menu.Item>
                    <Menu.Item key="2">admin</Menu.Item>
                    <Menu.Item key="3"  disabled>未开放...</Menu.Item>
                </Menu>
                <Dropdown overlay={popMenu}>
                    <div>
                        <span>administrators</span>&nbsp;&nbsp;&nbsp;
                        <DownOutlined />&nbsp;&nbsp;&nbsp;
                    </div>
                </Dropdown> 
                </Header>
                <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                    >
                        {routes.map(item => (
                            <Menu.Item key={item.path} icon={item.icon}
                            onClick={p => {
                                history.push(p.key)
                                console.log(p)
                            }}
                            >{item.title}</Menu.Item>
                        ))}
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                    >
                    {this.props.children}
                    </Content>
                </Layout>
                </Layout>
            </Layout>
        )
    }
}
export default withRouter(Index)
