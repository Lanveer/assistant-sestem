import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'dva/router';
import classnames from 'classnames';
import { ContainerQuery } from 'react-container-query';
import { RESPONSIVE_QUERY } from 'constants/constant';

class UserLayout extends PureComponent {
  static propTypes = {
    app: PropTypes.object,
    match: PropTypes.object,
    navData: PropTypes.array,
    getRouteData: PropTypes.func,
    location: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidCatch() {}

  render() {
    const { navData } = this.props;
    console.log('user navData data is:', navData);
    return (
      <ContainerQuery query={RESPONSIVE_QUERY}>
        {params => (
          <div className={classnames(['rc-layout-wrapper', params])}>
            {navData.map((item, index) => (
              <Route
                exact={item.exact}
                key={`item.path_${index}`}
                path={item.path}
                component={item.component}
              />
            ))}
          </div>
        )}
      </ContainerQuery>
    );
  }
}

export default UserLayout;
