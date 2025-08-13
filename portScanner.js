// 115.190.9.242

const net = require('net');
const { promisify } = require('util');

// 配置扫描参数
const targetHost = '115.190.9.242';
const startPort = 1;        // 起始端口
const endPort = 65535;      // 结束端口（所有可能的端口）
const timeout = 100;        // 连接超时时间（毫秒）
const concurrency = 100;    // 并发扫描数量（控制扫描速度，避免系统过载）

// 检测单个端口是否开放
async function checkPort(port) {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        socket.setTimeout(timeout);

        socket.connect(port, targetHost, () => {
            socket.destroy();
            resolve({ port, open: true });
        });

        socket.on('timeout', () => {
            socket.destroy();
            resolve({ port, open: false });
        });

        socket.on('error', () => {
            resolve({ port, open: false });
        });
    });
}

// 批量扫描端口（控制并发）
async function scanPorts() {
    console.log(`开始扫描 ${targetHost} 的端口范围 ${startPort}-${endPort}...`);
    console.log('扫描可能需要几分钟，请耐心等待...\n');

    const openPorts = [];
    const totalPorts = endPort - startPort + 1;
    let completed = 0;

    // 分批次扫描，控制并发量
    for (let i = startPort; i <= endPort; i += concurrency) {
        const batch = [];
        const batchEnd = Math.min(i + concurrency - 1, endPort);
        
        for (let port = i; port <= batchEnd; port++) {
            batch.push(checkPort(port).then(result => {
                completed++;
                // 显示进度（每完成1000个端口更新一次）
                if (completed % 1000 === 0) {
                    process.stdout.write(`进度: ${Math.round((completed / totalPorts) * 100)}% \r`);
                }
                if (result.open) {
                    openPorts.push(result.port);
                }
            }));
        }

        // 等待当前批次完成
        await Promise.all(batch);
    }

    // 输出结果
    console.log('\n\n扫描完成！');
    if (openPorts.length > 0) {
        console.log(`发现 ${openPorts.length} 个开放端口：`);
        console.log(openPorts.sort((a, b) => a - b).join(', '));
    } else {
        console.log('未发现开放端口');
    }
}

// 启动扫描
scanPorts().catch(err => {
    console.error('扫描过程中发生错误：', err);
});
