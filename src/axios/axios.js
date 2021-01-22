import axios from 'axios'
import { getToken } from '../utils/auth'

const  instance = instance.create({
    baseURL: 'http://localhost:3009',
    timeout:5000
})
/*二次封装 */
export function get(url,params) {
    return instance.get(url,{params})
}

export function post (url,data) {
    return instance.post(url,data)
}

export function put(url,data) {
    return instance.put(url,data)
}

export function  del (url) {
    return instance.delete(url)
}

// 路由守卫
instance.interceptors.request.use((config)=> {
    config.headers['authorization'] = 'Bearer' +getToken()
    return config
},(error) => {
    return Promise.reject(error)
})

instance.interceptors.response.use((response) =>  {
    return response.data
}, error => Promise.reject(error))