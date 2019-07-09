const queryString = require('query-string');
import { get, post, put, deleteRequest } from 'utils/fetch';
import { API_PRE } from 'constants/constant';
import fetch from 'dva/fetch';

// 获取项目配置列表
function getprojectConfigList() {
  // return get(`${API_PRE}/v1/proc-confs?bizType=BUSINESS_LOAN&creditReviewType=LOAN&page=1&pagesize=50`);
  return get(`api/list`);
}


// 获取项目配置列表
function getprojectVesionList(id) {
  return get(`${API_PRE}/v1/proc-confs/${id}/proc-conf-versions`);
}

// 项目属性新增
const addProperty = params => {
  return post(`${API_PRE}/v1/proc-confs`, {
    body: params,
  });
};

// 项目版本新增
const addVersionProperty = (params) => {
  return post(`${API_PRE}/v1/proc-confs/${params.id}/proc-conf-versions`, {
    body: params,
  });
};

// 获取版本号
// function getprojectVesion(id) {
//   return get(`${API_PRE}/v1/proc-confs/${id}/proc-conf-versions`);
// }


export {
  getprojectConfigList,
  getprojectVesionList,
  addProperty,
  addVersionProperty
};
