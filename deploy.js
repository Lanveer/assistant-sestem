const request = require('request');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const log = console.log;



uploadCMS();


function uploadCMS() {
  var form = {
    type: 'zip',
    unzip: 'true',
    forcePush: 'true'
  };

  log('Uploading using api: ' + UPLOAD_URL);
  log(
    'Uploading %s\nUploading form data: %s',
    filePath,
    JSON.stringify(form, null, ' ')
  );

  form.files = {
    value: file,
    options: {
      filename: path.basename(filePath),
      contentType: 'application/zip'
    }
  };

  request.put(
    {
      url: 'hhhhhhhh',
      formData: form,
      timeout: 600000,
      // gzip: true,

      headers: {
        'Accept-Language': 'en',
        Accept: '*/*',
        'User-Agent': 'request',
      },
      auth: {
        user: 'lanve',
        pass: 123
      }
    },
    (err, response, body) => {
      if (err) {
        log(err);
        throw new Error('上传文件服务器出错！');
      }
      try {
        body = JSON.parse(body);
        if (body.result !== 'success') {
          log(body);
          throw new Error('上传文件失败');
        }
        log('上传文件成功');
      } catch (e) {
        log(e);
        log(body);
        throw new Error('上传文件失败');
      }
    }
  );
}
