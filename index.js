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
setInterval(() => {
    // 每次请求生成新的时间戳和随机数
    const newTimestamp = Date.now();
    const newNonce = Math.random().toString(36).substring(2, 10);
    
    // 更新请求头
    t.headers["X-Timestamp"] = newTimestamp;
    t.headers["X-Nonce"] = newNonce;
    t.headers["X-Signature"] = Jp(t.params, t.data, newTimestamp, newNonce);

    // 发送GET请求
    axios.get('https://www.byteout.cn/api/auth/captcha', {
        headers: t.headers
    })
    .then(response => {
        console.log(`[${new Date().toLocaleTimeString()}] 请求成功:`, response.status);
    })
    .catch(error => {
        console.error(`[${new Date().toLocaleTimeString()}] 请求失败:`, error.message);
    });
}, 2000); // 每2秒执行一次