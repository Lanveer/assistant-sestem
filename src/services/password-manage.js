
import { get, post, put, deleteRequest} from 'utils/fetch';

function getList(pms) {
  return get(`api/list?page=${pms.page}&pagesize=${pms.pagesize}`, {
  });
}



function addList(id,pms) {
  return post(`api/list`, {
    body: {
      ...pms
    }
  });
}
function editeList(id, pms) {
  return put(`api/list?id=${id}`, {
    body: {
      ...pms
    }
  });
}


function deleteList(id) {
  return deleteRequest(`api/list?id=${id}`, {
  });
}
export { getList, addList, editeList, deleteList};
