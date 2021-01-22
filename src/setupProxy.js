const proxy  =  require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        proxy('/api1', { //遇见该字段就会触发代理请求
            target: 'http://localhost:6006', //请求代理的目标
            changeOrigin: true, //控制服务器收到的请求头总host字段的值
            pathRewrite: {'^/api1' : ''}//重写请求路径
        }),
        proxy('/api2', {
            target: 'http://www.innerjquery.club:5001',
            changeOrigin: true,
            pathRewrite: {'^/api2' : ''}
        }),
        proxy('/api3', {
            target: 'http://49.235.248.169:9000',
            changeOrigin: true,
            pathRewrite: {'^/api3' : ''}
        })
    )
}