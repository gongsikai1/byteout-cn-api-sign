const axios = require('axios');
var CryptoJS = require("crypto-js");

Kp = '8D7F2A9C4E5B1F3A6C9D2E8F7B1A5C3D'

ks = {
    HmacSHA256: CryptoJS.HmacSHA256,
    enc: CryptoJS.enc.Hex
}

Jp = (e={}, t={}, r, n) => {
    const o = {
        ...e,
        ...t
    }
      , s = Object.entries(o).map( ([l,u]) => [l, Zp(u)]).sort( (l, u) => l[0].localeCompare(u[0])).map( ([l,u]) => `${l}=${u}`).join("&")
      , i = [];
    s && i.push(s),
    i.push(`timestamp=${r}`, `nonce=${n}`);
    const c = i.join("&");
    return ks.HmacSHA256(c, Kp).toString(ks.enc.Hex)
}

n = Date.now()
o = Math.random().toString(36).substring(2, 10);

t = {
    headers: {
        "X-Timestamp": n,
        "X-Nonce": o,
        "X-Signature": ''
    },
    params: {

    },
    data: {

    }
}

t.headers["X-Timestamp"] = n,
t.headers["X-Nonce"] = o,
t.headers["X-Signature"] = Jp(t.params, t.data, n, o)
console.log('t', t)

// 新增定时请求函数
// const randomNumber = 2000
const randomNumber = Math.floor(Math.random() * 3001) + 2000;
setInterval(async () => {
    // 每次请求生成新的时间戳和随机数
    const newTimestamp = Date.now();
    const newNonce = Math.random().toString(36).substring(2, 10);
    
    // 更新请求头
    t.headers["X-Timestamp"] = newTimestamp;
    t.headers["X-Nonce"] = newNonce;
    t.headers["X-Signature"] = Jp(t.params, t.data, newTimestamp, newNonce);

    // 发送GET请求
    // axios.get('https://www.byteout.cn/api/auth/captcha', {
    //     headers: {
    //         ...t.headers,
    //         hello: Math.random().toString(36).substring(2, 10)
    //     }
    // })
    // .then(response => {
    //     console.log(`[${new Date().toLocaleTimeString()}] 请求成功:`, response.status);
    // })
    // .catch(error => {
    //     console.error(`[${new Date().toLocaleTimeString()}] 请求失败:`, error.message);
    // });

    // const url = 'https://www.byteout.cn/api/auth/sendMailCode/fl9420@qq.com/PASSWORD-RESET'
    const url = 'https://byteout.cn/api/auth/captcha'
    axios.get(url, {
        headers: {
            ...t.headers,
            hello: Math.random().toString(36).substring(2, 10)
        }
    })
    .then(response => {
        console.log(`[${new Date().toLocaleTimeString()}] 请求成功:`, response.status, response.data);
    })
    .catch(error => {
        console.error(`[${new Date().toLocaleTimeString()}] 请求失败:`, error.message);
    });

    // const res = await fetch("https://www.byteout.cn/api/auth/sendMailCode/fl9420@qq.com/PASSWORD-RESET", {
    // "headers": {
    //     "accept": "application/json, text/plain, */*",
    //     "accept-language": "zh-CN,zh;q=0.9",
    //     "cache-control": "no-cache",
    //     "pragma": "no-cache",
    //     "priority": "u=1, i",
    //     "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    //     "sec-ch-ua-mobile": "?0",
    //     "sec-ch-ua-platform": "\"Windows\"",
    //     "sec-fetch-dest": "empty",
    //     "sec-fetch-mode": "cors",
    //     "sec-fetch-site": "same-origin",
    //     "x-nonce": `${newNonce}`,
    //     "x-signature": `${t.headers["X-Signature"]}`,
    //     "x-timestamp": `${newTimestamp}`,
    //     "Referer": "https://www.byteout.cn/password-reset",
    //     "Referrer-Policy": "strict-origin-when-cross-origin",
    //     // ...t.headers,
    // },
    // "body": null,
    // "method": "GET"
    // });
    // console.log('res', res.body)
}, randomNumber); // 随机时间间隔执行