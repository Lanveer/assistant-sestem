import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { Icon } from 'antd';
import './style.scss';

export default class TogglePanel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showContent: true,
    };
  }

  handleToggleContent = () => {
    this.setState(pre => {
      return {
        showContent: !pre.showContent,
      };
    });
  };

  render() {
    const { title, children, hideTaggle, maxHeight, height, extra } = this.props;
    const { showContent } = this.state;
    const contentStatus = showContent ? 'showContent' : 'hiddentContent';
    const contentOverFlow = hideTaggle ? 'overflow-hide' : '';
    return (
      <div className="toggle-panel-wrapper">
        <div className="toggle-panel-header">
          <h1>{title}</h1>
          <div>
            {extra && <span className="toggle-panel-extra">{extra}</span>}
            {!hideTaggle && (
              <Icon
                onClick={this.handleToggleContent}
                type={showContent ? 'up' : 'down'}
                theme="outlined"
                style={{ marginTop: 4, cursor: 'pointer' }}
              />
            )}
          </div>
        </div>
        <div
          className={classnames(['toggle-panel-content', contentStatus, contentOverFlow])}
          style={{ maxHeight: maxHeight, height: height }}
        >
          {children}
        </div>
      </div>
    );
  }
}
