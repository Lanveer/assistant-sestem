import dva from 'dva';
import createLoading from 'dva-loading';
import createLogger from 'dva-logger';
import global from 'models/global';
import moment from 'moment';
import router from './router';
import createHistory from 'history/createHashHistory';
import { getEnvSuffix } from 'utils/common';
moment.locale('week-setting', {
  week: {
    dow: 1
  }
});

const app = dva({
    /** @todo define history */
    history: createHistory(),
    onError() {}
});

const envStr = getEnvSuffix();
app.use(createLoading());
/*
*如果调用api的前缀需要加-dev则加载答应日志功能
*/
if (envStr === '-demo') {
    app.use(createLogger());
}

app.model(global);

app.router(router);

app.start('#root');
