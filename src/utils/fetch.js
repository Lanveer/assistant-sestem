import fetch from 'dva/fetch';
import { notification, message } from 'antd';
import { UNIAUTH_RESPONSE_TO_TEXT } from 'constants/constant';
import _ from 'lodash';
import createHistory from 'history/createHashHistory';
import { getEnvSuffix } from 'utils/common';

notification.config({
  duration: 1
});

const queryString = require('query-string');
const API_PREFIX = getEnvSuffix();

/*
 * 处理状态码500，提示错误
 */
function handleHttp500(response) {
  response.json().then(res => {
    const { errorCode, errorMessage } = res;
    notification.error({
      message: '服务器错误',
      description: `${errorCode}:${errorMessage}`,
    });
  });
}

/*
* 处理状态码401跳转到登录页面
*/
function handleHttp401() {
  setTimeout(() => {
    window.location.href = `${window.location.origin +
      window.location.pathname}#/error`;
  }, 1000);
}

let show403Message = true;
function handleHttp403() {
  if (show403Message) {
    message.warning(
      '对不起！你暂未有此功能的操作权限，如需开通请联系系统管理员。'
    );
    show403Message = false;
    setTimeout(() => {
      show403Message = true;
    }, 1000);
  }
}

let show404Message = true;
function handleHttp404() {
  if (show404Message) {
    message.warning('未找到相关资源');
    show404Message = false;
    setTimeout(() => {
      show404Message = true;
    }, 1000);
  }
}

function handleHttp405() {
  message.warning('请求方法错误');
}

function handleHttp400(response) {
  response.json().then(res => {
    message.warning(res.errorMessage);
  });
}

export function handleHttpStatus(response) {
  let errorMessage = '';
  switch (response.status) {
    case 400:
      handleHttp400(response);
      errorMessage = '参数错误';
      break;
    case 401:
      handleHttp401();
      errorMessage = '未登录';
      break;
    case 403:
      handleHttp403();
      errorMessage = '权限拒绝';
      break;
    case 500:
      handleHttp500(response);
      errorMessage = '服务器错误';
      break;
    case 404:
      handleHttp404();
      errorMessage = '资源不存在';
      break;
    case 405:
      handleHttp405();
      errorMessage = '请求方法错误';
      break;
    default:
      errorMessage = '未知错误';
      break;
  }
  return errorMessage;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  let errorMessage = handleHttpStatus(response);
  const error = new Error(errorMessage);
  error.response = response;
  throw error;
}

function checkResponseError(response) {
  if (response.code && _.isNumber(response.code)) {
    if (response.code === 200) {
      return response;
    }
    if (response.code === 400) {
      const errorMessage = response.errors.join('');

      notification.error({
        message: '请求错误',
        description: errorMessage
      });
      return response;
    }
    const errorMessage = UNIAUTH_RESPONSE_TO_TEXT[response.code.toString()];

    notification.error({
      message: '请求错误',
      description: errorMessage
    });
    return response;
  }

  if (
    !_.isUndefined(response.info) &&
    _.find(response.info, item => {
      return item.name === 'LOGIN_REDIRECT_URL' && item.msg !== '/';
    })
  ) {
    // setTimeout(() => {
    //   window.location.href = `${window.location.origin + window.location.pathname}#/user/login`;
    // }, 1000);
    const error = new Error('未登录');
    error.code = 'Unauthorized';
    throw error;
  }
  if (response.status === 'fail') {
    const error = new Error(response.user_message || response.message);

    error.code = error.message;
    throw error;
  }
  return response;
}

function fetchTransformRule(response) {
  return response
    .json()
    .then(res => {
      const result = checkResponseError(res);
      const xSize = response.headers.get('X-Size');
      const total = !_.isNull(xSize) ? parseInt(xSize, 10) : 0;
      return {
        result,
        total
      };
    })
    .catch(error => {
      if (error.code) {
        notification.error({
          message: error.message,
          description: error.code
        });
      } else if ('stack' in error && 'message' in error) {
        if (error.message.indexOf('JSON')) {
          return {
            result: {},
            total: 0
          };
        }
      }
      throw error;
    });
}

function setUrlEnv(url) {
  const history = createHistory();
  // Get the current location.
  const { env } = queryString.parse(history.location.search);

  if (_.isEmpty(env) || _.isUndefined(env)) {
    return url;
  }

  let repalceUrl = '127.0.0.1';

  if (url.indexOf('v1.1') !== -1) {
    repalceUrl = '127.0.0.1/api';
  }

  return url.replace(repalceUrl, env);
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function base(url, options) {
  const defaultOptions = {
    credentials: 'include'
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method !== 'GET') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      ...newOptions.headers
    };

    if (_.isObject(newOptions.body)) {
      Object.keys(newOptions.body).forEach(key => {
        if (key.search('Date') !== -1 && newOptions.body[key] === 0) {
          newOptions.body[key] = null;
        }
      });
    }

    if (url.indexOf('uniauth') === -1) {
      newOptions.headers = {
        ...newOptions.headers,
        'Content-Type': 'application/json'
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      newOptions.body = queryString.stringify(newOptions.body);
    }
  }

  if (newOptions.method === 'GET') {
    newOptions.headers = {
      Accept: 'application/json, text/javascript, */*;',
      'Content-Type': 'application/json; charset=utf-8',
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Request-Headers': 'origin, content-type, accept'
      // 'local': navigator.language || 'en-US'
    };
    if (!_.isUndefined(options.data)) {
      let paramsArray = [];
      const params = options.data;
      Object.keys(options.data).forEach(key => {
        if (!_.isUndefined(params[key]) && _.trim(params[key])) {
          paramsArray.push(key + '=' + params[key]);
        }
      });
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&');
      } else {
        url += '&' + paramsArray.join('&');
      }
      delete newOptions.data;
    }
  }

  let requestUrl = url;
  if (API_PREFIX === '-dev') {
    requestUrl = setUrlEnv(url);
  }
  return fetch(requestUrl, newOptions)
    .then(
      response => checkStatus(response),
      () => {
        window.location.href = `${window.location.origin +
          window.location.pathname}#/user/login`;
      }
    )
    .then(response => fetchTransformRule(response));
}

export function put(url, options) {
  return base(url, { ...options, method: 'PUT' });
}

export function deleteRequest(url, options) {
  return base(url, { ...options, method: 'DELETE' });
}

export function post(url, options) {
  return base(url, { ...options, method: 'POST' });
}

export function get(url, options) {
  return base(url, { ...options, method: 'GET' });
}

export function postForm(url, options) {
  return fetch(url, {
    method: 'POST',
    credentials: 'omit',
    headers: {
      Accept: '*/*',
      'X-Requested-With': 'XMLHttpRequest'
    },
    ...options
  }).then(checkStatus);
}
