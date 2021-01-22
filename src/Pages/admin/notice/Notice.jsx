import React, { Component } from 'react'
import {Card,Avatar,List} from 'antd'

export default class Notices extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        const data = [
            {
              title: 'Notifications: These are mock messages 1',
            },
            {
              title: 'Notifications: These are mock messages 2',
            },
            {
              title: 'Notifications: These are mock messages 3',
            },
            {
              title: 'Notifications: These are mock messages 4',
            },
            {
              title: 'Notifications: These are mock messages 5',
            },
            {
              title: 'Notifications: These are mock messages 6',
            },
            {
              title: 'Notifications: These are mock messages 7',
            },
            {
              title: 'Notifications: These are mock messages 8',
            },
        ];
        console.log('notice被渲染了')
        return (
            <div>
                <Card title='通知中心'>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar src="https://innerfxy.icu/medias/awiter.jpg" />}
                            title={<a href="https://innerfxy.icu">{item.title}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                        )}
                    />,
                </Card>
            </div>
        )
    }
}
