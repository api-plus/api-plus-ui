import React from 'react';
import { inject, observer } from 'mobx-react';
import { string } from 'prop-types';

import Project from '../models/Project';

import './PathDetail.less'

@inject('projectListStore') @observer
class PathDetail extends React.Component {

  static propTypes = {
    path: string,
    method: string
  }

  static defaultProps = {
    path: null,
    method: null
  }

  render() {
    let { path, method } = this.props;


    return (
      <div className={`component-path-detail ${method}`}>
        <div className="summary">
          <span className="method">{method.toUpperCase()}</span> {path}
        </div>
      </div>
    );
  }
}

export default PathDetail;