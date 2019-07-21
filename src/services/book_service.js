
import { get, post, put, deleteRequest} from 'utils/fetch';

function getList(pms) {
  return get(`api/book_list?page=${pms.page}&pagesize=${pms.pagesize}`, {
  });
}



function addList(pms) {
  return post(`api/book_list`, {
    body: {
      ...pms
    }
  });
}
function editeList(pms,id) {
  return put(`api/book_list?id=${id}`, {
    body: {
      ...pms
    }
  });
}


function deleteList(id) {
  return deleteRequest(`api/book_list?id=${id}`, {
  });
}
export { getList, addList, editeList, deleteList};
