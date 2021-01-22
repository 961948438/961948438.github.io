import React, { Component } from 'react'
import { Form, Card,Input, Button,message,Result,Upload} from 'antd'
import { SmileOutlined,InboxOutlined } from '@ant-design/icons';
import axios from 'axios'
const { Dragger } = Upload;


export default class Edit extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name:'ubushi1',
            price : null,
            isedit: false,
            currentshopname: ''
        }
    }
    priceValidate = (rule,value,callback) =>  {
        console.log('进入自定义验证规则')
        if( value*1 > 100 | value*1 < 5) {
            return  Promise.reject('价格不能大于100$且不能小于5$');
        } else {
            return  Promise.resolve();
        }
    }
    formRef = React.createRef()
    handleSubmit= e => {
        e.preventDefault()
        console.log(this.formRef)
    }
    onFinish = (values) => {
        console.log('Success:', values);
        axios.post('/api2/reactaddshop',values).then(r=>{
            console.log(r)
            message.success('Added product successfully',2)
        }).catch(err=>{
            console.log(err)
            message.error(err)
        })
    }
    onFinishFailed = (errorInfo) => {
        if(errorInfo.errorFields[0])
        console.log('Failed:', errorInfo);
        const error =  errorInfo.errorFields.map( item => (item.errors) )
        message.error(error)
    }
    componentDidMount(){
        const shopid = this.props.match.params.id
        console.log(shopid)
        if (shopid === 'id') {
            return false
        }
        this.setState({isedit:true})
        axios.get(`/api2/reactfindoneshop?shopid=${shopid}`,).then(r => {
            const obj = {
                name: r.data.result[0].name,
                price: r.data.result[0].price
            }
            console.log(obj)
            this.setState({
                    name:obj.name,
                    price: obj.price,
                    currentshopname:obj.name
            })
        })
    }
    render() {     
        const props = {
            name: 'file',
            multiple: true,
            action: 'http://www.innerjquery.club:9000/uploadimg',
            onChange(info) {
            console.log(info)
              const { status } = info.file;
              if (status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
              } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            },
        };   
        return (
            <Card title='TO Edit'>
                {
                    this.state.isedit?
                    <Result
                    status="warning"
                    title={`Here's some information about the product name: ${this.state.currentshopname} !`}
                    />: 
                    <Result
                    icon={<SmileOutlined />}
                    title="Great, We can start adding items!"
                    />
                }
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                      band files
                    </p>
                  </Dragger>
                <Form name="basic" onSubmitCapture={this.handleSubmit} 
                onFinish={this.onFinish}  onFinishFailed={this.onFinishFailed} ref={this.formRef}>
                    <Form.Item label="名字"  name="name"
                    rules={[
                        {
                          required: true,
                          message: 'Please input your shopname!',
                        },
                    ]}>
                        <Input placeholder="麻烦输入名字" value={this.state.name}></Input>
                    </Form.Item>
                    <Form.Item label="价格"  name="price"
                    rules={[
                        {
                          required: true,
                          message: 'Please input your shopprice!',
                        },{
                            validator: this.priceValidate
                        }
                    ]}>
                        <Input placeholder="麻烦输入价格" type="text"  value={this.state.price}></Input>
                    </Form.Item>
                    <Form.Item className='observebtn'>
                        <Button type="primary"  htmlType="submit">保存</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
