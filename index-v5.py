# import requests
# import time

# while True:
#     try:
#         r = requests.get('https://byteout.cn/api/auth/captcha')
#         print(r.text)
#     except Exception as e:
#         print(f"请求出错: {e}")
    
#     # 暂停0.001秒（1毫秒）
#     time.sleep(0.001)
    
import requests
import time

while True:
    try:
        start = time.time()
        r = requests.get('https://byteout.cn/api/auth/captcha')
        end = time.time()
        print(f"请求耗时: {end - start:.3f}秒，响应: {r.text}")
    except Exception as e:
        print(f"请求出错: {e}")
    
    time.sleep(0.001)