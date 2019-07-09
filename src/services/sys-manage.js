import { API_PRE } from 'constants/constant';
import { get, post, put} from 'utils/fetch';
const GET_MENUS = API_PRE + '/v1.1/menus';
const POST_MENUS = API_PRE + '/v1/menus';
const PUT_MENUS = (id)=> API_PRE + `/v1/menus/${id}`;

function getMenus() {
  return get(GET_MENUS, {});
}

function addMenus(params) {
  return post(POST_MENUS, {
    body: {
      ...params
    }
  });
}

function forbidMenus(params) {
  return put(PUT_MENUS(params.id), {
    body: {
      status: params.status
    }
  });
}

export { getMenus, addMenus, forbidMenus };
