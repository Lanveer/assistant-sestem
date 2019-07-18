
import {post} from 'utils/fetch';

function search(pms, flag) {
  return post(`api/search?flag=${flag}`, {
    body: {
      ...pms
    }
  });
}

export {search};
