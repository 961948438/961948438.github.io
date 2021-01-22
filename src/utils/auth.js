export function getToken() {
    return localStorage.getItem('ts_token')
}
export function setToken(ts_token)  {
    localStorage.setItem('ts_token',ts_token)
}

export function isLogin() {
    console.log('被调用'+localStorage.getItem('ts_token'))
    if (localStorage.getItem('ts_token')) {
        return true
    }
    return false
}
export function esc() {
    localStorage.removeItem('ts_token')
}