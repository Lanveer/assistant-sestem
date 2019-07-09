var express = require('express');
var initProxy = require('./proxy');
var router = express.Router();

// 获取健康状态
router.get('/health', function(req, res) {
  res.json({ code: 0, result: 'It works.', message: 'It works.' });
});
router.get('*', function(req, res) {
  initProxy(req, res);
});

module.exports = function initRouter(app) {
  app.use(router);
};
