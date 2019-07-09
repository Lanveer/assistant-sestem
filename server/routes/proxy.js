var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});

proxy.on('proxyRes', function(proxyRes, req, res) {
  ['date', 'etag', 'last-modified'].forEach(headerTag => {
    if (headerTag in proxyRes.headers) {
      delete proxyRes.headers[headerTag];
    }
  });
  proxyRes.headers['Cache-Control'] = 'no-cache';
});

module.exports = function initProxy(req, res) {
  var env = req.app.locals.env;

  let FILE_PATH = 'rc-frontend';

  if (env === '-dev') {
    FILE_PATH = 'rc-frontend-dev';
    env = '-demo';
  }

  var Host = 's' + env + '.hello.com';

  proxy.web(req, res, {
    target: 'https://' + Host + '/static/' + FILE_PATH + '/index.html',
    prependPath: true,
    ignorePath: true,
    headers: {
      Host: Host
    }
  });
};
