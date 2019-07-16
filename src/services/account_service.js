
import { get, post, put, deleteRequest} from 'utils/fetch';

function getList(pms) {
  return get(`api/accountlist?page=${pms.page}&pagesize=${pms.pagesize}`, {
  });
}



function addList(pms) {
  return post(`api/accountlist`, {
    body: {
      ...pms
    }
  });
}
function editeList(pms,id) {
  return put(`api/accountlist?id=${id}`, {
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
