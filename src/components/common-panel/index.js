import React from 'react';
import './style.scss';

export default function CommonPanel(props) {
  return <div className="common-panel-wrapper">{props.children}</div>;
}
