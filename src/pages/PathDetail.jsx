import React from 'react';
import { Card, Icon, Popconfirm } from 'antd';
import { inject, observer } from 'mobx-react';
import { func, string } from 'prop-types';

import Project from '../models/Project';
import Ajax from '../components/ajax';

import './PathDetail.less'

@inject('projectListStore') @observer
class PathDetail extends React.Component {

  render() {
    let { path } = this.props.match.params;
    path = decodeURIComponent(path);

    return (
      <span>{path}</span>
    );
  }
}

export default PathDetail;