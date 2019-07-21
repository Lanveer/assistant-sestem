
import {post} from 'utils/fetch';

function login(pms) {
  return post(`api/login`, {
    body: {
      ...pms
    }
  });
}


function upload(pms, flag) {
  return post(`api/upload?flag=${flag}`, {
    body: {
      ...pms
    }
  });
}

export {login, upload};
