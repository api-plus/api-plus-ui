import React from 'react';
import Button from 'material-ui/Button';
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
    console.log(projects);
    return (
      <List className="project-manager-container">
        {
          projects.map((project, projectIndex) => {
            return (
              <div key={projectIndex}>
                <ListItem button key={project.id} onClick={this.toogleFold.bind(this, project)}>
                  <ListItemText primary={project.name} />
                </ListItem>
                <Collapse in={project.fold} transitionDuration="auto" unmountOnExit>
                  {
                    project.apis.map((api, apiIndex) => {
                      return (
                        <Link className="api-link-button" key={api.id} to={`/api/${api.id}`}>
                          <Button disableRipple>{api.path}</Button>
                        </Link>
                      )
                    })
                  }
                </Collapse>
              </div>
            )
          })
        }
      </List>
    );
  }
}
