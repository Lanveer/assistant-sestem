import fetch from 'dva/fetch';
import { handleHttpStatus } from './fetch';
import { message } from 'antd';
/*
* 下载文件
*/
function checkStatus(response) {
  if (response.status === 200) {
    console.log(response);

    response
      .blob()
      .then(blob => {
        let a = document.createElement('a');
        // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
        let url = window.URL.createObjectURL(blob);

        let filename = response.headers.get('Content-Disposition');

        filename = filename.match(/filename="(\S*)"/)[1];
        a.href = url;
        a.download = decodeURI(filename);
        a.click();
        window.URL.revokeObjectURL(url);
        return { result: 'succuss' };
      })
      .catch(() => {
        message.error('下载文件失败');
      });
  }
  handleHttpStatus(response);
  return { result: 'fail' };
}

export function downloadFile(url) {
  const defaultOptions = { credentials: 'include' };

  defaultOptions.headers = {
    Accept: 'application/json, text/javascript, */*;',
    'Content-Type': 'application/json; charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Request-Headers': 'origin, content-type, accept'
    // 'local': navigator.language || 'en-US'
  };

  return fetch(url, defaultOptions).then(checkStatus);
}