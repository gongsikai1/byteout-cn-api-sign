const axios = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent');

const getHTTPSProxy = async () => {
    let HTTPSProxy = null;
    const locations = {
        putian: 'http://v2.api.juliangip.com/company/postpay/getips?auto_white=1&city=莆田&num=1&pt=1&result_type=json&trade_no=6792146775149790&sign=f271c25f90c87c16381ad1988bb9ba41',
        random: 'http://v2.api.juliangip.com/company/postpay/getips?auto_white=1&num=1&pt=1&result_type=json&trade_no=6792146775149790&sign=3ebb4cd5cf9b5605f8e79fea844297c1'
    }
    let res = null;
    let proxyAgent = null;
    try {
        res = await axios.get(locations.random)
        console.log('res', res)
        // console.log('r', res.data.data.proxy_list[0])
        // res = {"code":200,"msg":"成功","data":{"count":1,"filter_count":1,"surplus_quantity":0,"proxy_list":["110.53.250.157:25538"]}}
        const [ip, port] = (res || {})?.data?.data?.proxy_list[0]?.split(':')
        const proxy_addr = `http://${ip}:${port}`;
        console.log('proxy_addr', proxy_addr)
        proxyAgent = await new HttpsProxyAgent(proxy_addr);
        // const r = await proxyAgent
    } catch(e) {
        console.log('e', e)
    }
    return proxyAgent;
}

// const result = getHTTPSProxy();
// console.log('result', result)
// result.then((res) => {
//   console.log('res', res)
// })

// console.log('111', new HttpsProxyAgent('http://127.0.0.1:8080'))

module.exports = getHTTPSProxy;
