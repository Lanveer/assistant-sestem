import React from 'react';
import ErrorImg from 'styles/img/error.png';
import './style.scss';
import PublicButton from 'components/public-button';

export default function ErrorPage403() {
  return (
    <div className="error-wrapper">
      <img src={ErrorImg} />
      <div>
        <h1>403</h1>
        <h1>抱歉你没有菜单权限,请联系管理员。</h1>
        <PublicButton
          text={'点击返回登陆界面'}
          type={'primary'}
          customStyle={{ height: '32px', width: '100%' }}
          handleClick={() =>
            (window.location.href = `${window.location.origin +
              window.location.pathname}#/user/login`)
          }
        />
      </div>
    </div>
  );
}
