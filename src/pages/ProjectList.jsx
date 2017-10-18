import React from 'react';
import { array, func } from 'prop-types';
import { inject, observer } from "mobx-react";
import { Link } from 'react-router-dom';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import Collapse from 'material-ui/transitions/Collapse';

import './ProjectList.less';

@inject('projectListStore') @observer
export default class ProjectsList extends React.Component {


  toogleFold = (project) => {
    project.toggleFold(project.fold);
  }

  render() {
    const { projects, project, api } = this.props.projectListStore;
    const currentProject = project;
    return (
      <List className="project-manager-container">
        {
          projects.map((project, projectIndex) => {
            return (
                <ListItem button key={project.id} onClick={this.toogleFold.bind(this, project)}>
                  <Link to={`/project/${project.id}`}>{project.info.title}</Link>
                </ListItem>
            )
          })
        }
      </List>
    );
  }
}
