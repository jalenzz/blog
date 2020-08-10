import re
import urllib
import requests

header_baidu = {
  'User-Agent': 'curl/7.12.1',
  'Host':'data.zz.baidu.com',
  'Content-Type': 'text/plain',
  'Content-Length': '83'
}
html = urllib.request.urlopen('https://blog.jalenchuh.cn/sitemap.xml').read()
html = html.decode('utf-8')
result = re.findall(re.compile(r'(?<=<loc>).*?(?=</loc>)'), html)

for item in result:
  print(item + '\n' +
    requests.post(
      'http://data.zz.baidu.com/urls?site=https://blog.jalenchuh.cn&token=BAIDU_TOKEN',
      data = item,
      headers = header_baidu
    ).text + '\n'
  )
