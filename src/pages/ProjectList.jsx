import qs from 'querystring';
import React from 'react';
import { inject, observer } from "mobx-react";
import { Link } from 'react-router-dom';
import createHistory from 'history/createHashHistory';
const history = new createHistory();

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import Collapse from 'material-ui/transitions/Collapse';
import Button from 'material-ui/Button';

import './ProjectList.less';

@inject('projectListStore') @observer
export default class ProjectsList extends React.Component {
  handleProjectClick = (project, path, method) => {
    const { projectListStore } = this.props;
    projectListStore.setProject(project);
    if (path && method) {
      projectListStore.setPath(path);
      projectListStore.setMethod(method);
      history.push({
        pathname: `/project/${project.id}`,
        search: qs.stringify({
          method: method,
          path: encodeURIComponent(path),
        })
      });
    } else {
      projectListStore.setPath(null);
      projectListStore.setMethod(null);
      history.push(`/project/${project.id}`);
    }
  }

  handleCreateProjectClick = () => {
    history.push('/create/project');
  }


  render() {
    const { projects, project, api } = this.props.projectListStore;
    const projectId = project ? project.id : '';

    return (
      <List className="project-manager-container">

        {/* <Button raised color="primary" className="add-button" onClick={this.handleCreateProjectClick}>
          ＋ 新建项目
        </Button> */}
      {
        projects.map((item, i) => (
          <span key={item.id}>
            <ListItem className="list-item" button onClick={this.handleProjectClick.bind(this, item, null, null)}>
            {item.info.title}
            </ListItem>
            <Collapse 
              className="list-collapse"
              in={item.id === projectId} 
              transitionDuration="auto" 
              unmountOnExit
            >
            {
              Object.entries(item.paths).map(([path, schema]) => (
                <span key={path}>
                {
                  Object.keys(schema).map(method => (
                    <ListItem
                      className="list-item" 
                      button 
                      key={method} 
                      onClick={this.handleProjectClick.bind(this, item, path, method)}
                    >
                      {`${method.toUpperCase()} ${path}`}
                    </ListItem>
                  ))
                }
                </span>
              ))
            }
            </Collapse>
          </span>
        ))
      }
      </List>
    );
  }
}
