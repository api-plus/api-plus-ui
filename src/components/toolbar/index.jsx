import React from 'react';
import { inject, observer } from "mobx-react";

import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

@inject('projectListStore') @observer
export default class AppToolBar extends React.Component {

  render() {
    const { project, path, method } = this.props.projectListStore;
    let title = 'Api Plus';
    if (path && method) {
      title = `${method.toUpperCase()} ${path}`;
    } else if (project && project.info && project.info.title) {
      title = project.info.title;
    }
    
    return (
      <Toolbar>
        <Typography type="title" color="inherit" >
          {title}
        </Typography>
      </Toolbar>
    );
  }
}