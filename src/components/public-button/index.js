import React from 'react';
import classnames from 'classnames';
import './style.scss';
/*
*type:默认有两种样式按钮 primary,default
*handleClick:点击事件回调
*customStyle:自定义样式属性
*text: button的文本
*size:large,middle,small
*icon:图标节点
*/
export default function PublicButton(props) {
  const { type, handleClick, customStyle, text, size, icon, disabled } = props;

  const buttonType = type === 'primary' ? 'button-wrapper-primary' : '';

  const buttonSize = size ? `button-${size}` : '';

  const buttonIsAllow = disabled ? 'button-forbit' : '';

  return (
    <div
      onClick={handleClick}
      style={{ ...customStyle }}
      className={classnames([
        'button-wrapper',
        buttonType,
        buttonSize,
        buttonIsAllow
      ])}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
}
