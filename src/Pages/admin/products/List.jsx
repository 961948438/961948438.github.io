import React, { Component } from 'react'
import {Card,Table,Button,Popconfirm, message ,Switch} from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import {withRouter} from 'react-router-dom'
import axios from 'axios'


const dataSource = [
    {
        key: 'xz',
        name: '香皂',
        id:'0001',
        price: '6$',
    },
    {   
        key: 'tls',
        id:'0002',
        name: '特伦舒',
        price: '16$'
    },
    {   
        key: 'xwx',
        id:'0003',
        name: '小碗熊',
        price: '60$'
    },{
        id:'0004',
        key: 'dwm',
        name: '大碗面',
        price: '11$'
    },
]

class List extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            shopdata: [],
            totalcount: 0,
            offset: 0
        }
    }
    componentWillMount() {
        axios.get('/api2/reactcount').then(r => {
            console.log(r.data)
            this.setState({totalcount:r.data.result})
        })
        axios.get(`/api2/reactfindshop?count=7&offset=${this.state.offset}`).then(r => {
            console.log(r.data.result)
            this.setState({shopdata:r.data.result})
        })
    }
    
    changedata = (page) => {
        console.log(page)
        this.setState({offset:(page-1)*7},()=> {
            axios.get(`/api2/reactfindshop?count=7&offset=${this.state.offset}`).then(r => {
                console.log(r.data.result)
                this.setState({shopdata:r.data.result})
            })
        })
        
    }
    render() {
        const columns = [
            {
                title:'序号',
                key: 'id',
                width: 80,
                align: 'center',
                render:(txt,record,index) => index + 1
            },{
                title:"主键",
                key: 'key',
                width: 180,
                dataIndex: 'key'
            },{
                title:"创建时间",
                key: 'created_at',
                width: 180,
                //表格中的render方法会遍历创建每一行，因此每次的record都是一行的数据
                render:(txt,record,index) => {
                    console.log(record,txt)
                    return <span>{new Date(record.created_at).toDateString()}</span>
                }
            },
            {
                title: '名字',
                key: 'name',
                width: 180,
                dataIndex: 'name'
            },{
                title:"价格",
                key: 'price',
                width: 180,
                dataIndex: 'price'
            },{
                title:"online",
                key: 'online',
                render:(txt,record,index) =>(<Switch checkedChildren="开启" 
                unCheckedChildren="关闭" defaultChecked /> )
            },
            {
                title:"操作",
                key:'ope',
                render: (txt,record,index) => {
                    const {history} = this.props
                    return (
                        <div style={{textAlign: 'center'}}>
                            <Button type="primary" style={{margin:'0 25px'}} onClick={e=>{
                                history.push(`/admin/products/edit/${record. shopid}`)
                            }}
                            > 修改</Button>
                            <Popconfirm title="确认删除？" onCancel={() => console.log('用户取消')}
                            onConfirm={() => {
                                console.log(record)
                                console.log('确认删除！')
                                axios.post('/api2/reactRemoveData',{
                                    shopid:record.shopid
                                }).then(r =>{
                                    console.log(r)
                                    if(r.data.code === 999) {
                                        message.success('successfully delete',3,()=>(window.location.reload()))
                                    }
                                })
                                //此处调接口
                            }}>
                                <Button type="danger" style={{margin:'0 25px'}} >
                                    删除
                                </Button>
                            </Popconfirm>
                        </div>
                    )
                }
            }
        ] 
        const { history } = this.props
        const { totalcount,shopdata } = this.state
        return (
            <Card title="商品列表" extra={<Button type="primary" 
           size="small"  onClick={ () =>   history.push('/admin/products/edit/id?') }
           > 新增</Button>}>
               <Table  columns={columns} bordered pagination={{total:totalcount,defaultPageSize:7,onChange:this.changedata}}
                dataSource={shopdata}>

               </Table>
           </Card>
        )
    }
}

export default withRouter(List)