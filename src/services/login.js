
import {post} from 'utils/fetch';

function login(pms) {
  console.log('login pms data is:',pms);
  return post(`api/login`, {
    body: {
      ...pms
    }
  });
}

export {login};
