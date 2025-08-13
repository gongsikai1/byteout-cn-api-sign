const net = require('net');

// 配置参数
const targetHost = 'byteout.cn';
const targetPort = 443;
const checkInterval = 1; // 检测间隔（毫秒），建议不要小于100

// 检测端口连通性的函数
function checkPort() {
    const startTime = Date.now();
    const client = net.createConnection({
        host: targetHost,
        port: targetPort,
        timeout: 5000 // 5秒超时
    });

    client.on('connect', () => {
        const duration = Date.now() - startTime;
        console.log(`[${new Date().toISOString()}] 连接成功 - 耗时 ${duration}ms`);
        client.destroy(); // 立即关闭连接
    });

    client.on('error', (err) => {
        console.log(`[${new Date().toISOString()}] 连接失败: ${err.message}`);
    });

    client.on('timeout', () => {
        console.log(`[${new Date().toISOString()}] 连接超时`);
        client.destroy();
    });
}

// 启动定时检测
console.log(`开始检测 ${targetHost}:${targetPort}，间隔 ${checkInterval}ms...`);
setInterval(checkPort, checkInterval);

// 初始立即执行一次
checkPort();
