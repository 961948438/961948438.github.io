import {post} from  '../axios/axios.js'

export function loginApi(user)  {
    return post('/api/v1/auth/manager_login',user)
}