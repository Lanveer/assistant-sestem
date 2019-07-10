
import { get, post, put} from 'utils/fetch';

function getListData(pms) {
  return get(`api/list?page=${pms.page}&pagesize=${pms.pagesize}`, {
    data:pms
  });
}

// function addMenus(params) {
//   return post(POST_MENUS, {
//     body: {
//       ...params
//     }
//   });
// }


export { getListData };
