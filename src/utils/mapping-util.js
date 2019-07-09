import _ from 'lodash';
import { numberFormat } from './common';
import moment from 'moment';

import { TIME_FOMATE } from 'constants/constant';
export function setDefaultValue(value, type = 'text', mapDict = {}) {
  let renderStr = '-';
  if (!_.isNull(value) && !_.isUndefined(value)) {
    renderStr = value;

    switch (type) {
      case 'money':
        renderStr = numberFormat(value);
        break;
      case 'bool':
        renderStr = value ? '是' : '否';
        break;
      case 'date':
        if (_.isNumber(value)) {
          renderStr = moment(value).format(TIME_FOMATE);
        }
        break;
      case 'dict':
        renderStr = mapDict[value] || value || '-';
        break;
      case 'array':
        renderStr = _.isArray(value) ? value.join(',') : value;
        break;
      case 'receiver':
        if (_.isArray(value) && !_.isEmpty(value)) {
          renderStr = '';
          value.map(item => {
            renderStr += `${item.name}  `;
          });
        }
        break;
      case 'enumList':
        let showLabel = '';
        if (_.isArray(value)) {
          value.map(item => {
            showLabel += `${mapDict[item]}  `;
          });
        }
        renderStr = showLabel;
        break;
      default:
        if (_.isObject(value)) {
          let showLabel = '';
          Object.keys(value).forEach(key => {
            showLabel += value[key];
          });
          renderStr = showLabel;
        } else {
          renderStr = value;
        }
    }

    /*
    * 只用于三方数据通讯信息中的服务信息明细字段
    */
    if (type === 'serviceDetails') {
      if (_.isArray(value) && !_.isEmpty(value)) {
        renderStr = '';

        renderStr = value.map(item => {
          return `${item.interactMth} : ${item.interactCnt}次 `;
        });
        return renderStr;
      }
    }
  }
  return renderStr;
}
