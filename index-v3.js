const axios = require('axios');
var CryptoJS = require("crypto-js");

const getHTTPSProxy = require('./httpsProxy');

const init = async () => {

    const USE_PROXY = true

    Kp = '8D7F2A9C4E5B1F3A6C9D2E8F7B1A5C3D'

    let proxyInfo = null;
    // proxyInfo = getHTTPSProxy();
    // setInterval首先立即执行一次怎么写

    // const getProxy = async () => {
    proxyInfo = await getHTTPSProxy();
    // }

    console.log('proxyInfo', proxyInfo)

    setInterval(async () => {
    proxyInfo = await getHTTPSProxy();
    console.log('proxyInfo', proxyInfo)
    }, 1000 * 60)

    Kp = '8D7F2A9C4E5B1F3A6C9D2E8F7B1A5C3D'

    ks = {
        HmacSHA256: CryptoJS.HmacSHA256,
        enc: CryptoJS.enc.Hex
    }

    const Eg = e => e == null ? "" : Array.isArray(e) ? e.map(t => t != null ? t.toString() : "").join(",") : e.toString()

    // _g = "8D7F2A9C4E5B1F3A6C9D2E8F7B1A5C3D"
    const gg = (e={}, t={}) => {
        const r = Date.now()
        , n = u0()
        , o = {
            ...e,
            ...t
        }
        , s = Object.entries(o).map( ([l,u]) => [l, Eg(u)]).sort( (l, u) => l[0].localeCompare(u[0])).map( ([l,u]) => `${l}=${u}`).join("&")
        , i = [];
        s && i.push(s),
        i.push(`timestamp=${r}`, `nonce=${n}`);
        const c = i.join("&");
        return Object.values({
            nonce: n,
            timestamp: r,
            signature: ks.HmacSHA256(c, Kp).toString(ks.enc.Hex)
        }).join("/")
    }

    const Jp = (e={}, t={}, r, n) => {
        const o = {
            ...e,
            ...t
        }
        console.log('o', o)
        const s = Object.entries(o).map( ([l,u]) => [l, Zp(u)]).sort( (l, u) => l[0].localeCompare(u[0])).map( ([l,u]) => `${l}=${u}`).join("&")
        , i = [];
        s && i.push(s),
        i.push(`timestamp=${r}`, `nonce=${n}`);
        const c = i.join("&");
        return ks.HmacSHA256(c, Kp).toString(ks.enc.Hex)
    }

    n = Date.now()
    o = Math.random().toString(36).substring(2, 10);


    const u0 = () => {
        const e = new Uint8Array(16);
        return crypto.getRandomValues(e),
        Array.from(e, t => t.toString(16).padStart(2, "0")).join("")
    }

    const Vl = e => {
        const t = `${e.visitorId}|${e.timestamp}|${e.nonce}`;
        return ks.HmacSHA256(t, Kp).toString()
    }

    let = deviceFingerPrint = ''

    function Ht(e, t, r, n) {
        function o(a) {
            return a instanceof r ? a : new r(function(s) {
                s(a)
            }
            )
        }
        return new (r || (r = Promise))(function(a, s) {
            function i(u) {
                try {
                    l(n.next(u))
                } catch (f) {
                    s(f)
                }
            }
            function c(u) {
                try {
                    l(n.throw(u))
                } catch (f) {
                    s(f)
                }
            }
            function l(u) {
                u.done ? a(u.value) : o(u.value).then(i, c)
            }
            l((n = n.apply(e, t || [])).next())
        }
        )
    }

    function $t(e, t) {
        var r = {
            label: 0,
            sent: function() {
                if (a[0] & 1)
                    throw a[1];
                return a[1]
            },
            trys: [],
            ops: []
        }, n, o, a, s = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
        return s.next = i(0),
        s.throw = i(1),
        s.return = i(2),
        typeof Symbol == "function" && (s[Symbol.iterator] = function() {
            return this
        }
        ),
        s;
        function i(l) {
            return function(u) {
                return c([l, u])
            }
        }
        function c(l) {
            if (n)
                throw new TypeError("Generator is already executing.");
            for (; s && (s = 0,
            l[0] && (r = 0)),
            r; )
                try {
                    if (n = 1,
                    o && (a = l[0] & 2 ? o.return : l[0] ? o.throw || ((a = o.return) && a.call(o),
                    0) : o.next) && !(a = a.call(o, l[1])).done)
                        return a;
                    switch (o = 0,
                    a && (l = [l[0] & 2, a.value]),
                    l[0]) {
                    case 0:
                    case 1:
                        a = l;
                        break;
                    case 4:
                        return r.label++,
                        {
                            value: l[1],
                            done: !1
                        };
                    case 5:
                        r.label++,
                        o = l[1],
                        l = [0];
                        continue;
                    case 7:
                        l = r.ops.pop(),
                        r.trys.pop();
                        continue;
                    default:
                        if (a = r.trys,
                        !(a = a.length > 0 && a[a.length - 1]) && (l[0] === 6 || l[0] === 2)) {
                            r = 0;
                            continue
                        }
                        if (l[0] === 3 && (!a || l[1] > a[0] && l[1] < a[3])) {
                            r.label = l[1];
                            break
                        }
                        if (l[0] === 6 && r.label < a[1]) {
                            r.label = a[1],
                            a = l;
                            break
                        }
                        if (a && r.label < a[2]) {
                            r.label = a[2],
                            r.ops.push(l);
                            break
                        }
                        a[2] && r.ops.pop(),
                        r.trys.pop();
                        continue
                    }
                    l = t.call(e, r)
                } catch (u) {
                    l = [6, u],
                    o = 0
                } finally {
                    n = a = 0
                }
            if (l[0] & 5)
                throw l[1];
            return {
                value: l[0] ? l[1] : void 0,
                done: !0
            }
        }
    }

    function Tm() {
        if (!(window.__fpjs_d_m || Math.random() >= .001))
            try {
                // 改写成axios请求
                axios.get('https://m1.openfpcdn.io/fingerprintjs/v4.6.2/npm-monitoring')
                // var e = new XMLHttpRequest;
                // e.open("get", "https://m1.openfpcdn.io/fingerprintjs/v".concat('4.6.2', "/npm-monitoring"), !0),
                // e.send()
            } catch (t) {
                console.error(t)
            }
    }

    function Aa(e, t) {
        return new Promise(function(r) {
            return setTimeout(r, e, t)
        }
        )
    }

    function Ah(e, t) {
        t === void 0 && (t = 1 / 0);
        var r = window.requestIdleCallback;
        return r ? new Promise(function(n) {
            return r.call(window, function() {
                return n()
            }, {
                timeout: t
            })
        }
        ) : Aa(Math.min(e, t))
    }

    function wm(e) {
        return e === void 0 && (e = 50),
        Ah(e, e * 2)
    }


    function km(e) {
        var t;
        return e === void 0 && (e = {}),
        Ht(this, void 0, void 0, function() {
            var r, n, o;
            return $t(this, function(a) {
                switch (a.label) {
                case 0:
                    return (!((t = e.monitoring) !== null && t !== void 0) || t) && Tm(),
                    r = e.delayFallback,
                    n = e.debug,
                    [4, wm(r)];
                case 1:
                    return a.sent(),
                    o = bm({
                        cache: {},
                        debug: n
                    }),
                    [2, Sm(o, n)]
                }
            })
        })
    }

    function Lh(e, t) {
        var r = Bh(e);
        t = t || 0;
        var n = [0, r.length], o = n[1] % 16, a = n[1] - o, s = [0, t], i = [0, t], c = [0, 0], l = [0, 0], u;
        for (u = 0; u < a; u = u + 16)
            c[0] = r[u + 4] | r[u + 5] << 8 | r[u + 6] << 16 | r[u + 7] << 24,
            c[1] = r[u] | r[u + 1] << 8 | r[u + 2] << 16 | r[u + 3] << 24,
            l[0] = r[u + 12] | r[u + 13] << 8 | r[u + 14] << 16 | r[u + 15] << 24,
            l[1] = r[u + 8] | r[u + 9] << 8 | r[u + 10] << 16 | r[u + 11] << 24,
            xt(c, bn),
            Cr(c, 31),
            xt(c, Cn),
            Se(s, c),
            Cr(s, 27),
            Zt(s, i),
            xt(s, Zs),
            Zt(s, Th),
            xt(l, Cn),
            Cr(l, 33),
            xt(l, bn),
            Se(i, l),
            Cr(i, 31),
            Zt(i, s),
            xt(i, Zs),
            Zt(i, kh);
        c[0] = 0,
        c[1] = 0,
        l[0] = 0,
        l[1] = 0;
        var f = [0, 0];
        switch (o) {
        case 15:
            f[1] = r[u + 14],
            it(f, 48),
            Se(l, f);
        case 14:
            f[1] = r[u + 13],
            it(f, 40),
            Se(l, f);
        case 13:
            f[1] = r[u + 12],
            it(f, 32),
            Se(l, f);
        case 12:
            f[1] = r[u + 11],
            it(f, 24),
            Se(l, f);
        case 11:
            f[1] = r[u + 10],
            it(f, 16),
            Se(l, f);
        case 10:
            f[1] = r[u + 9],
            it(f, 8),
            Se(l, f);
        case 9:
            f[1] = r[u + 8],
            Se(l, f),
            xt(l, Cn),
            Cr(l, 33),
            xt(l, bn),
            Se(i, l);
        case 8:
            f[1] = r[u + 7],
            it(f, 56),
            Se(c, f);
        case 7:
            f[1] = r[u + 6],
            it(f, 48),
            Se(c, f);
        case 6:
            f[1] = r[u + 5],
            it(f, 40),
            Se(c, f);
        case 5:
            f[1] = r[u + 4],
            it(f, 32),
            Se(c, f);
        case 4:
            f[1] = r[u + 3],
            it(f, 24),
            Se(c, f);
        case 3:
            f[1] = r[u + 2],
            it(f, 16),
            Se(c, f);
        case 2:
            f[1] = r[u + 1],
            it(f, 8),
            Se(c, f);
        case 1:
            f[1] = r[u],
            Se(c, f),
            xt(c, bn),
            Cr(c, 31),
            xt(c, Cn),
            Se(s, c)
        }
        return Se(s, n),
        Se(i, n),
        Zt(s, i),
        Zt(i, s),
        Ks(s),
        Ks(i),
        Zt(s, i),
        Zt(i, s),
        ("00000000" + (s[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (s[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (i[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (i[1] >>> 0).toString(16)).slice(-8)
    }

    function Fm(e) {
        for (var t = "", r = 0, n = Object.keys(e).sort(); r < n.length; r++) {
            var o = n[r]
            , a = e[o]
            , s = "error"in a ? "error" : JSON.stringify(a.value);
            t += "".concat(t ? "|" : "").concat(o.replace(/([:|\\])/g, "\\$1"), ":").concat(s)
        }
        return t
    }

    function Wl(e) {
        return Lh(Fm(e))
    }

    function Ul(e) {
        return JSON.stringify(e, function(t, r) {
            return r instanceof Error ? Rh(r) : r
        }, 2)
    }

    var Lm = {
        load: km,
        hashComponents: Wl,
        componentsToDebugString: Ul
    };

    // 每第50次访问getVisitId生成一次新visitorId
    // let requestCount = 0;
    // const getVisitId = () => {
        
    //     return `${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`
    // }
    let requestCount = 0;
    let visitorId = null; // 新增变量存储visitorId
    const getVisitId = () => {
        requestCount++;
        // 第50次访问或首次访问时生成新visitorId
        if (requestCount >= 10 || !visitorId) {
            visitorId = `${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
            requestCount = 0; // 重置计数器
        }
        // visitorId = `${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
        return visitorId;
    }

    Om = async () => {
        // console.log('1')
        // let = t = {}
        // try {
        //     t = await (await Lm.load()).get()
        // } catch (e) {
        //     console.log('ee', e)
        // }
        // console.log('t')
        // 生成visitorId，值为随机的32位的数字或字母
        // const visitorId8 = Math.random().toString(36).substring(2, 10)
        const visitorId = getVisitId();
        const t = {"visitorId": visitorId, "confidence": { score: 0.9 },"timestamp":1754273741977,"nonce":"978b7e7a9ddb363bec02be7e8c98419f","signature":"ef30943e6ce7ad82e30ae6470009aa7da17cf07b85353c0b17d2a5e4890243f3"}
        // console.log('uo')
        // console.log('uo', u0())
        const r = {
            visitorId: t.visitorId,
            confidence: t.confidence.score,
            timestamp: Date.now(),
            nonce: u0(),
            signature: ""
        };
        // console.log('v1', r)
        try {
            // console.log('v1', Vl(r))
        } catch (e) {
            // console.log('e', e)
        }
        r.signature = Vl(r);
        // console.log('r', r)
        deviceFingerPrint = JSON.stringify(r)
    }

    Om()

    // deviceFingerPrint = {"visitorId":"05c6a60e638b533b527d71ccbba40479","confidence":0.6,"timestamp":1754270961272,"nonce":"e767a7a556d8a34c9f01dec792f05ab9","signature":"340295029406afe14bfd668ca3a812b116a931be73da69684883fc9b571c5eac"}

    Im = () => {
        Om()
        // const e = localStorage.getItem('device_fingerprint');
        const e = deviceFingerPrint;
        console.log('e', e)
        // if (!deviceFingerPrint)
        //     throw new Error("Device fingerprint not initialized");
        const t = JSON.parse(e);
        t.timestamp = Date.now();
        t.nonce = u0();
        t.signature = Vl(t);
        deviceFingerPrint = JSON.stringify(t);
        // localStorage.setItem('device_fingerprint', JSON.stringify(t));
        return Object.values(t).join("/");
    }

    t = {
        headers: {
            "X-Timestamp": n,
            "X-Nonce": o,
            "X-Signature": '',
            'Req-Signature': '',
            "Req-Device-Fingerprint": Im(),
            "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEwMCwic3ViIjoiMTAwIiwiaWF0IjoxNzU0NTMxNjg3LCJleHAiOjE3NTUxMzY0ODd9.-QVuOCS9-Ts2jJwiZAHtR8NYJCEs9j_sXX5Nj3mOwXrdvU-cIpxI-lzFRhgu5pOVVhbPbeKX2e6XBjdhnaBppg",
        },
        params: {
            size: 3000,
            current: 1,
            title: '',
        },
        data: {

        }
    }

    // t.headers["X-Timestamp"] = n,
    // t.headers["X-Nonce"] = o,
    // t.headers["X-Signature"] = Jp(t.params, t.data, n, o)
    console.log('t', t)

    // 新增定时请求函数
    // const randomNumber = 2000 * 30
    // 生成1ms到2000ms的随机数
    // let randomNumber = Math.floor(Math.random() * 2000) + 1;
    let randomNumber = 2001
    // const randomNumber = Math.floor(Math.random() * 3001) + 2000;
    const timeId = setInterval(async () => {
        // 每次请求生成新的时间戳和随机数
        const newTimestamp = Date.now();
        const newNonce = Math.random().toString(36).substring(2, 10);
        
        // 更新请求头
        // t.headers["X-Timestamp"] = newTimestamp;
        // t.headers["X-Nonce"] = newNonce;
        // t.headers["X-Signature"] = Jp(t.params, t.data, newTimestamp, newNonce);
        t.headers['Req-Signature'] = gg(t.params, t.data, newTimestamp, newNonce);
        t.headers["Req-Device-Fingerprint"] = Im();
        t.headers['Referer'] = 'https://byteout.cn/api/auth/captcha'

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

        // const url = `https://www.byteout.cn/api/auth/sendMailCode/fl9420${Math.random().toString(36).substring(2, 10)}@qq.com/PASSWORD-RESET`
        // const url = 'https://byteout.cn/api/auth/captcha'
        const url = 'https://byteout.cn/api/article/page?size=3000&current=1&title='
        // console.log('proxyInfo', proxyInfo)
        axios.get(url, {
            headers: {
                "authority": "byteout.cn",
                "method": "GET",
                "path": "/api/article/page",
                "scheme": "https",
                "accept": "application/json, text/plain, */*",
                "accept-language": "zh-CN,zh;q=0.9",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "priority": "u=1, i",
                // "req-device-fingerprint": "05c6a60e638b533b527d71ccbba40479/0.6/1754363102353/2edd02c20acd8707f555f0ae4726554a/7547c6431a60b87c91dbff17a30321326cec538120937e4bf334f33a0913afee",
                // "req-signature": "3af932b2c66b578cc1802b7a1ea4ee52/1754363102353/aaa34d58511649bbffd3001efc564f1f4a7c5d7c00288830d85aec9c9478d442",
                "sec-ch-ua": `\"Google Chrome ${Math.random()}\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"`,
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": `\"Windows ${Math.random()}\"`,
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "Referer": "https://byteout.cn/api/article/page",
                "Referrer-Policy": "strict-origin-when-cross-origin",
                // "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEwMCwic3ViIjoiMTAwIiwiaWF0IjoxNzU0NTMxNjg3LCJleHAiOjE3NTUxMzY0ODd9.-QVuOCS9-Ts2jJwiZAHtR8NYJCEs9j_sXX5Nj3mOwXrdvU-cIpxI-lzFRhgu5pOVVhbPbeKX2e6XBjdhnaBppg",
                ...t.headers,
                hello: Math.random().toString(36).substring(2, 10),
                [Math.random().toString(36).substring(2, 10)]: Math.random().toString(36).substring(2, 10)
            },
            ...(USE_PROXY ? { httpsAgent: proxyInfo } : {}), // 绑定代理
        })
        .then(response => {
            console.log(`[${new Date().toLocaleTimeString()}] 请求成功:`, response.status, response.data);
        })
        .catch(error => {
            console.log(`[${new Date().toLocaleTimeString()}] 请求失败:`, error.message);
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
}
init()