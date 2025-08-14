const puppeteer = require('puppeteer');
const axios = require('axios');
var CryptoJS = require("crypto-js");
const https = require('https');

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

    let browser = null;
    let currentPage = null;

    try {
        browser = await puppeteer.launch({
            headless: "new",
            args: [
                '--disable-blink-features=AutomationControlled',
                ...(proxyInfo ? [`--proxy-server=http://${proxyInfo.host}:${proxyInfo.port}`] : []),
                '--disable-web-security', // 禁用同源策略（关键修复）
                '--disable-features=IsolateOrigins,site-per-process', // 禁用站点隔离
                '--disable-features=SameSiteByDefaultCookies',
                '--no-sandbox',  // 添加沙箱禁用参数（解决部分环境问题）
                '--disable-setuid-sandbox'
            ],
            ignoreHTTPSErrors: true,
            timeout: 20000
        });
        console.log('浏览器启动成功');
        currentPage = await browser.newPage();
        console.log('页面启动成功');
    } catch (error) {
        console.error('浏览器启动失败:', error);
        process.exit(1);  // 启动失败时退出程序
    }

    setInterval(async () => {
        proxyInfo = await getHTTPSProxy();
        console.log('proxyInfo', proxyInfo)

        try {
            await browser.close();
            browser = await puppeteer.launch({
                headless: "new",
                args: [
                    '--disable-blink-features=AutomationControlled',
                    ...(proxyInfo ? [`--proxy-server=http://${proxyInfo.host}:${proxyInfo.port}`] : []),
                    '--disable-web-security', // 禁用同源策略（关键修复）
                    '--disable-features=IsolateOrigins,site-per-process', // 禁用站点隔离
                    '--disable-features=SameSiteByDefaultCookies',
                    '--no-sandbox',  // 添加沙箱禁用参数（解决部分环境问题）
                    '--disable-setuid-sandbox'
                ],
                ignoreHTTPSErrors: true,
                timeout: 20000
            });
            console.log('浏览器启动成功');
            currentPage = await browser.newPage();
            console.log('页面启动成功');
        } catch (error) {
            console.error('浏览器启动失败:', error);
            process.exit(1);  // 启动失败时退出程序
        }
    }, 1000 * 60);

    const aaa = Math.random().toString(36).substring(2, 10);

    // 启动无头浏览器
    // const browser = await puppeteer.launch({
    //     headless: "new",
    //     args: [
    //         // '--no-sandbox',
    //         // '--disable-setuid-sandbox',
    //         //  `--proxy-server=${proxyInfo.host}:${proxyInfo.port}`
    //     ]
    // });
        // 添加浏览器启动错误捕获
    

    const page = await browser.newPage();

    // 注入必要的polyfill
    // await page.evaluateOnNewDocument(() => {
    //     window.crypto.getRandomValues = array => {
    //         for (let i = 0; i < array.length; i++) {
    //             array[i] = Math.floor(Math.random() * 256);
    //         }
    //         return array;
    //     };
    // });

    const url = `https://byteout.cn/api/auth/captcha?aaa=${aaa}`;

    // const url = 'http://gongsikai.com'

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
            // "X-Timestamp": n,
            // "X-Nonce": o,
            // "X-Signature": '',
            'Req-Signature': '',
            "Req-Device-Fingerprint": Im(),


            // "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEwNCwic3ViIjoiMTA0IiwiaWF0IjoxNzU0NjIxMDk2LCJleHAiOjE3NTUyMjU4OTZ9.IUZqb6UNlKRcOJIrqEJybNdfkICPgvPmm6fw5nAMKOA6gnJmlekEk1dveqSkcDDCzkf43oWSUFXiSgAqDJBxyQ",

            // "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEwNCwic3ViIjoiMTA0IiwiaWF0IjoxNzU0NjE1NzAzLCJleHAiOjE3NTUyMjA1MDN9.ZQqytx_-6umEvjIfbIeBZ57THSb4g3xtriiASG9jTXhsidTOTLuz9-m2mPf-g3DfWtnneZ6n949ifnMhEGuC9w",
            
            // r.e.be.c.c.a97.1.0@gmail.com
            // "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEwMywic3ViIjoiMTAzIiwiaWF0IjoxNzU0NTUwNjA2LCJleHAiOjE3NTUxNTU0MDZ9.3FozKWJv8R-KRysFRR2_aovqVzDj680WEH1DbuJIP2MahIiGloCl3GlNRzQwwwsbD8iJLB-V26BvM1R8OTrVbQ",

            // b.e.lv.illevir.g.o@gmail.com
            // "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEwMiwic3ViIjoiMTAyIiwiaWF0IjoxNzU0NTQ0ODgyLCJleHAiOjE3NTUxNDk2ODJ9.NAla22ljZWapkJFO2zpR-Tb2aeb-lit-VXyUT3cI5JnxbTuL5JvByL70cVbm6uxNlPMjFUTOYvrN3kyNl3JoTg",


            // s.j.s.bca.ksg.g.sk.sv@gmail.com
            // "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEwMSwic3ViIjoiMTAxIiwiaWF0IjoxNzU0NTM4MDQ3LCJleHAiOjE3NTUxNDI4NDd9.tKd06eAGNwxMD56b8O5XZvu_FOSADk8Hk_J6iQOgBR_Ki6QfJ2-T0ZmCQUr9IbY9m4vY5YzuhwowQlMUqzlysw",
            
            // d.ndng.zm.s.nfsm.b.t@gmail.com
            // "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEwMCwic3ViIjoiMTAwIiwiaWF0IjoxNzU0NTMxNjg3LCJleHAiOjE3NTUxMzY0ODd9.-QVuOCS9-Ts2jJwiZAHtR8NYJCEs9j_sXX5Nj3mOwXrdvU-cIpxI-lzFRhgu5pOVVhbPbeKX2e6XBjdhnaBppg",
        },
        params: {
            aaa,
            // size: 3000,
            // current: 1,
            // title: '',
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
    // let randomNumber = 1
    // const randomNumber = Math.floor(Math.random() * 3001) + 2000;

    
    
    const sendRequest = async () => {

        // 创建全新页面实例而非复用全局page
        // console.log('000')
        console.log('000 111')

        // 每次请求生成新的时间戳和随机数
        const newTimestamp = Date.now();
        const newNonce = Math.random().toString(36).substring(2, 10);
        
        const headers = {};

        // 处理带冒号的特殊请求头（HTTP/2伪头字段）
        // Object.defineProperty(headers, ':authority', {
        // value: 'byteout.cn',
        // enumerable: true // 确保属性可枚举，Axios才能正确读取
        // });
        // Object.defineProperty(headers, ':method', {
        // value: 'GET',
        // enumerable: true
        // });
        // Object.defineProperty(headers, ':path', {
        // value: '/api/auth/captcha',
        // enumerable: true
        // });
        // Object.defineProperty(headers, ':scheme', {
        // value: 'https',
        // enumerable: true
        // });

        // 设置其他常规请求头
        headers.accept = 'application/json, text/plain, */*';
        headers['accept-encoding'] = 'gzip, deflate, br, zstd';
        headers['accept-language'] = 'zh-CN,zh;q=0.9';
        headers['cache-control'] = 'no-cache';
        headers.pragma = 'no-cache';
        headers.priority = 'u=1, i';
        headers.referer = 'https://byteout.cn/article/manage';
        // t.headers['Req-Signature'] = gg(t.params, t.data, newTimestamp, newNonce);
        // t.headers["Req-Device-Fingerprint"] = Im();
        headers['req-device-fingerprint'] = Im();
        headers['req-signature'] = gg(t.params, t.data, newTimestamp, newNonce);
        headers['sec-ch-ua'] = '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"';
        headers['sec-ch-ua-mobile'] = '?0';
        headers['sec-ch-ua-platform'] = '"Windows"';
        headers['sec-fetch-dest'] = 'empty';
        headers['sec-fetch-mode'] = 'cors';
        headers['sec-fetch-site'] = 'same-origin';
        headers['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36';
        // 'X-Requested-With': undefined
        // headers['X-Requested-With'] = 'XMLHttpRequest';
        // headers['X-Requested-With'] = '';

        // ... existing signature generation code ...

        // // 使用浏览器环境发起请求
        // await page.setExtraHTTPHeaders(headers);
        // const response = await page.goto(url, {
        //     waitUntil: 'networkidle2',
        //     timeout: 30000
        // });

        // console.log(`请求状态: ${response.status()} ${url}`);
        try {
            
            if (!currentPage) return console.error('无法创建新页面');
            await currentPage.setExtraHTTPHeaders(headers);
            console.log(111)
            // const response = await currentPage.goto(url, {
            //     waitUntil: 'domcontentloaded', // 修改等待策略
            //     timeout: 20000, // 延长超时时间
            //     // referer: headers.referer,
            //     // referrerPolicy: 'strict-origin-when-cross-origin',
            //     // ignoreHTTPSErrors: true  // 添加SSL错误忽略
            // });
            const responseBody = await currentPage.evaluate(async (url, headers) => {
                try {
                    const res = await fetch(url, {
                        method: 'GET',
                        headers: headers,
                        // credentials: 'omit'
                    });
                    console.log('res', res)
                    return await res.text();
                } catch (e) {
                    return `{ "error": "${e.message}" }`;
                }
            }, url, headers);
            console.log(222)
            // console.log(`请求成功: ${response.status()} ${url}`);
            // 添加响应状态验证
            // 验证响应内容类型
            // const contentType = response.headers()['content-type'];
            // if (!contentType || !contentType.includes('application/json')) {
            //     throw new Error('Invalid content-type: ' + contentType);
            // }

            // const responseBody = await response.text();
            console.log('响应体内容:', responseBody);
            // console.log(`请求成功: ${response.status()} ${url} ${JSON.stringify(response)}`);
            if (!currentPage.isClosed()) {
                await currentPage.close().catch(() => {});
            }
        } catch (error) {
            console.error(`请求失败: ${error.message}`, {
                url,
                headers,
                proxy: proxyInfo,
                stack: error.stack, // 记录错误堆栈
                errorCode: error.code
            });
            // 失败后刷新页面
            // await page.reload();
            if (!currentPage) return console.error('无法创建新页面');
            if (!currentPage.isClosed()) {
                await currentPage.close().catch(() => {});
            }
            // await currentPage.close();
            // await browser.newPage();
        } finally {
            // 确保当前页面关闭
            // if (!currentPage.isClosed()) {
            //     await currentPage.close().catch(() => {});
            // }
        }
    };

    // const randomNumber = 1;
    // const randomNumber = () => 2000 + Math.floor(Math.random() * 3000); // 2-5 s 随机
    const randomNumber = 1


    // await sendRequest();
    // 修改定时器逻辑
    const interval = setInterval(async () => {
        await sendRequest();
    }, randomNumber);

    // 关闭浏览器钩子
    // process.on('SIGINT', async () => {
    //     clearInterval(interval);
    //     await browser.close();
    //     process.exit();
    // });

    // const timeId = setInterval(async () => {
    //     // 每次请求生成新的时间戳和随机数
    //     const newTimestamp = Date.now();
    //     const newNonce = Math.random().toString(36).substring(2, 10);
        
    //     // 更新请求头
    //     // t.headers["X-Timestamp"] = newTimestamp;
    //     // t.headers["X-Nonce"] = newNonce;
    //     // t.headers["X-Signature"] = Jp(t.params, t.data, newTimestamp, newNonce);
    //     t.headers['Req-Signature'] = gg(t.params, t.data, newTimestamp, newNonce);
    //     t.headers["Req-Device-Fingerprint"] = Im();
    //     // t.headers['Referer'] = 'https://byteout.cn/api/auth/captcha'

    //     // 发送GET请求
    //     // axi os.get('https://www.byteout.cn/api/auth/captcha', {
    //     //     headers: {
    //     //         ...t.headers,
    //     //         hello: Math.random().toString(36).substring(2, 10)
    //     //     }
    //     // })
    //     // .then(response => {
    //     //     console.log(`[${new Date().toLocaleTimeString()}] 请求成功:`, response.status);
    //     // })
    //     // .catch(error => {
    //     //     console.error(`[${new Date().toLocaleTimeString()}] 请求失败:`, error.message);
    //     // });

    //     // const url = `https://www.byteout.cn/api/auth/sendMailCode/fl9420${Math.random().toString(36).substring(2, 10)}@qq.com/PASSWORD-RESET`
    //     // const url = 'https://byteout.cn/api/auth/captcha'
    //     const url = `https://byteout.cn/static/svg/BOY_AVATAR_A-BR_yOe4P.svg?b=${Math.random()}`
    //     // const url = 'https://ooljc.com/static/webp/background-BXWqynIs.webp'
    //     // const url = 'https://115.190.9.242/api/auth/captcha'
    //     // const url = 'https://byteout.cn/api/article/page?size=3000&current=1&title='
    //     if (!proxyInfo) return ;
    //     // console.log('proxyInfo', proxyInfo)

    //     console.log('t.headers', t.headers)
    //     const httpsAgent = new https.Agent({
    //         rejectUnauthorized: false,
    //         agent: proxyInfo // 将代理绑定到 HTTPS Agent
    //     });

    //     // fetch("https://byteout.cn/api/auth/captcha", {
    //     //     "headers": {
    //     //         "accept": "application/json, text/plain, */*",
    //     //         "accept-language": "zh-CN,zh;q=0.9",
    //     //         "cache-control": "no-cache",
    //     //         "pragma": "no-cache",
    //     //         "priority": "u=1, i",
    //     //         "req-device-fingerprint": "jl2r4dmqpgjdi8qy3b3jq07pu9elb1gt/0.9/1754963303521/38875976e298b16acd29f9927ce68cf3/66db3e4cd3f5f846aff47fe3787846d97ed222a0a5759eacf32046f791613dc2",
    //     //         "req-signature": "697ade55b44b1695ec14b8b5ead057d9/1754963303519/75f9c019c122baa0103666ef997acbca4f1eaa8f0af704b0de45404b061e9e0c",
    //     //         "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    //     //         "sec-ch-ua-mobile": "?0",
    //     //         "sec-ch-ua-platform": "\"Windows\"",
    //     //         "sec-fetch-dest": "empty",
    //     //         "sec-fetch-mode": "cors",
    //     //         "sec-fetch-site": "same-origin"
    //     //     },
    //     //     "referrer": "https://byteout.cn/article/manage",
    //     //     "referrerPolicy": "strict-origin-when-cross-origin",
    //     //     "body": null,
    //     //     "method": "GET",
    //     //     "mode": "cors",
    //     //     "credentials": "omit"
    //     //     });

    //     // 创建包含特殊请求头的配置对象
    //     const headers = {};

    //     // 处理带冒号的特殊请求头（HTTP/2伪头字段）
    //     // Object.defineProperty(headers, ':authority', {
    //     // value: 'byteout.cn',
    //     // enumerable: true // 确保属性可枚举，Axios才能正确读取
    //     // });
    //     // Object.defineProperty(headers, ':method', {
    //     // value: 'GET',
    //     // enumerable: true
    //     // });
    //     // Object.defineProperty(headers, ':path', {
    //     // value: '/api/auth/captcha',
    //     // enumerable: true
    //     // });
    //     // Object.defineProperty(headers, ':scheme', {
    //     // value: 'https',
    //     // enumerable: true
    //     // });

    //     // 设置其他常规请求头
    //     headers.accept = 'application/json, text/plain, */*';
    //     headers['accept-encoding'] = 'gzip, deflate, br, zstd';
    //     headers['accept-language'] = 'zh-CN,zh;q=0.9';
    //     headers['cache-control'] = 'no-cache';
    //     headers.pragma = 'no-cache';
    //     headers.priority = 'u=1, i';
    //     headers.referer = 'https://byteout.cn/article/manage';
    //     // t.headers['Req-Signature'] = gg(t.params, t.data, newTimestamp, newNonce);
    //     // t.headers["Req-Device-Fingerprint"] = Im();
    //     headers['req-device-fingerprint'] = Im();
    //     headers['req-signature'] = gg(t.params, t.data, newTimestamp, newNonce);
    //     headers['sec-ch-ua'] = '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"';
    //     headers['sec-ch-ua-mobile'] = '?0';
    //     headers['sec-ch-ua-platform'] = '"Windows"';
    //     headers['sec-fetch-dest'] = 'empty';
    //     headers['sec-fetch-mode'] = 'cors';
    //     headers['sec-fetch-site'] = 'same-origin';
    //     headers['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36';
    //     // 'X-Requested-With': undefined
    //     // headers['X-Requested-With'] = 'XMLHttpRequest';
    //     headers['X-Requested-With'] = undefined;


    //     // axios.get(url, {
    //     //     headers: headers,
    //     //     // 禁用Axios默认添加的全局头，避免冲突
    //     //     // transformRequest: [(data, reqHeaders) => {
    //     //     //     // 移除可能干扰的默认头
    //     //     //     delete reqHeaders.common['User-Agent'];
    //     //     //     delete reqHeaders.common['Accept'];
    //     //     //     return data;
    //     //     // }],
    //     //     // headers: {
    //     //     //     "accept": "application/json, text/plain, */*",
    //     //     //     "accept-language": "zh-CN,zh;q=0.9",
    //     //     //     "cache-control": "no-cache",
    //     //     //     "pragma": "no-cache",
    //     //     //     "priority": "u=1, i",
    //     //     //     "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    //     //     //     "sec-ch-ua-mobile": "?0",
    //     //     //     "sec-ch-ua-platform": "\"Windows\"",
    //     //     //     "sec-fetch-dest": "empty",
    //     //     //     "sec-fetch-mode": "cors",
    //     //     //     "sec-fetch-site": "same-origin",
    //     //     //     "referrer": "https://byteout.cn/article/manage",
    //     //     //     "referrerPolicy": "strict-origin-when-cross-origin",
    //     //     //     // "authority": "byteout.cn",
    //     //     //     // "method": "GET",
    //     //     //     // "path": "/api/article/page",
    //     //     //     // "scheme": "https",
    //     //     //     // "accept": "application/json, text/plain, */*",
    //     //     //     // "accept-language": "zh-CN,zh;q=0.9",
    //     //     //     // "cache-control": "no-cache",
    //     //     //     // "pragma": "no-cache",
    //     //     //     // "priority": "u=1, i",
    //     //     //     // // "req-device-fingerprint": "05c6a60e638b533b527d71ccbba40479/0.6/1754363102353/2edd02c20acd8707f555f0ae4726554a/7547c6431a60b87c91dbff17a30321326cec538120937e4bf334f33a0913afee",
    //     //     //     // // "req-signature": "3af932b2c66b578cc1802b7a1ea4ee52/1754363102353/aaa34d58511649bbffd3001efc564f1f4a7c5d7c00288830d85aec9c9478d442",
    //     //     //     // "sec-ch-ua": `\"Google Chrome ${Math.random()} ${Math.random()}\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"`,
    //     //     //     // "sec-ch-ua-mobile": "?0",
    //     //     //     // "sec-ch-ua-platform": `\"Windows ${Math.random()} ${Math.random()}\"`,
    //     //     //     // "sec-fetch-dest": "empty",
    //     //     //     // "sec-fetch-mode": "cors",
    //     //     //     // "sec-fetch-site": "same-origin",
    //     //     //     // "Referer": "https://byteout.cn/login",
    //     //     //     // // "Referer": "https://115.190.9.242/login",
    //     //     //     // "Referrer-Policy": "strict-origin-when-cross-origin",
    //     //     //     // // "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEwMCwic3ViIjoiMTAwIiwiaWF0IjoxNzU0NTMxNjg3LCJleHAiOjE3NTUxMzY0ODd9.-QVuOCS9-Ts2jJwiZAHtR8NYJCEs9j_sXX5Nj3mOwXrdvU-cIpxI-lzFRhgu5pOVVhbPbeKX2e6XBjdhnaBppg",
    //     //     //     ...t.headers,
    //     //     //     // hello: Math.random().toString(36).substring(2, 10),
    //     //     //     // [Math.random().toString(36).substring(2, 10)]: Math.random().toString(36).substring(2, 10)
    //     //     // },
    //     //     ...(USE_PROXY ? { httpsAgent } : {}), // 绑定代理
    //     // })
    //     // .then(response => {
    //     //     console.log(`[${new Date().toLocaleTimeString()}] 请求成功:`, response.status, response.data, url);
    //     // })
    //     // .catch(error => {
    //     //     console.log(`[${new Date().toLocaleTimeString()}] 请求失败:`, error.message, url, JSON.stringify(error));
    //     //     // const time = new Date().toLocaleTimeString();
    //     //     // let errorDetails = `[${time}] 请求失败: ${error.message}，URL: ${url}`;
            
    //     //     // // 检查是否有服务器响应
    //     //     // if (error.response) {
    //     //     //     // 响应中包含的HTML内容
    //     //     //     errorDetails += `\n服务器返回HTML: ${error.response.data}`;
    //     //     //     // 也可以同时打印状态码
    //     //     //     errorDetails += `\n状态码: ${error.response.status}`;
    //     //     // } else {
    //     //     //     errorDetails += `\n无响应数据: ${JSON.stringify(error)}`;
    //     //     // }
            
    //     //     // console.log(errorDetails);
    //     // });


    //     // const res = await fetch("https://www.byteout.cn/api/auth/sendMailCode/fl9420@qq.com/PASSWORD-RESET", {
    //     // "headers": {
    //     //     "accept": "application/json, text/plain, */*",
    //     //     "accept-language": "zh-CN,zh;q=0.9",
    //     //     "cache-control": "no-cache",
    //     //     "pragma": "no-cache",
    //     //     "priority": "u=1, i",
    //     //     "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    //     //     "sec-ch-ua-mobile": "?0",
    //     //     "sec-ch-ua-platform": "\"Windows\"",
    //     //     "sec-fetch-dest": "empty",
    //     //     "sec-fetch-mode": "cors",
    //     //     "sec-fetch-site": "same-origin",
    //     //     "x-nonce": `${newNonce}`,
    //     //     "x-signature": `${t.headers["X-Signature"]}`,
    //     //     "x-timestamp": `${newTimestamp}`,
    //     //     "Referer": "https://www.byteout.cn/password-reset",
    //     //     "Referrer-Policy": "strict-origin-when-cross-origin",
    //     //     // ...t.headers,
    //     // },
    //     // "body": null,
    //     // "method": "GET"
    //     // });
    //     // console.log('res', res.body)
    // }, randomNumber); // 随机时间间隔执行
}
init()