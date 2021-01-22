import React, { Component } from 'react'
import { Statistic, Row, Col, Button ,Card} from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

export default class Index extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    onFinish=() => {
        console.log('finished!');
    }
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <Col span={12}>
                    <Statistic title="Active Users" value={112893} />
                    </Col>
                    <Col span={12}>
                    <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
                    <Button style={{ marginTop: 16 }} type="primary">
                        Recharge
                    </Button>
                    </Col>
                    <Col span={12}>
                    <Statistic title="Active Users" value={112893} loading />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                    <Card>
                        <Statistic
                        title="Active"
                        value={11.28}
                        precision={2}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<ArrowUpOutlined />}
                        suffix="%"
                        />
                    </Card>
                    </Col>
                    <Col span={12}>
                    <Card>
                        <Statistic
                        title="Idle"
                        value={9.3}
                        precision={2}
                        valueStyle={{ color: '#cf1322' }}
                        prefix={<ArrowDownOutlined />}
                        suffix="%"
                        />
                    </Card>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                    <Countdown title="Countdown" value={deadline} onFinish={this.onFinish} />
                    </Col>
                    <Col span={12}>
                    <Countdown title="Million Seconds" value={deadline} format="HH:mm:ss:SSS" />
                    </Col>
                    <Col span={24} style={{ marginTop: 32 }}>
                    <Countdown title="Day Level" value={deadline} format="D 天 H 时 m 分 s 秒" />
                    </Col>
                </Row>
            </div>
        )
    }
}
