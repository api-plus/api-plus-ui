import React from 'react';
import { inject, observer } from 'mobx-react';

import Project from '../models/Project';
import './ProjectDetail.less';

@inject('projectListStore', 'uiStore') @observer
export default class ProcjectDetail extends React.Component {

  componentWillReceiveProps(newProps) {
    // if (newProps.match && 
    //   newProps.match.params.id !== this.props.match.params.id) {
    //   const { projectListStore, uiStore } = this.props;
    //   const project = projectListStore.getProject(parseInt(newProps.match.params.id));
    //   if (!project) return;
    //   projectListStore.setProject(project);
    //   uiStore.setPageTitle(project.info.title);
    // }
  }

  handleDeleteClick = async () => {
    const { project, projects } = this.props.projectListStore;
    const { code } = await Project.remove(project.id);
    this.props.projectListStore.removeProject(project.id);
    if (projects.length) {
      location.hash = `/project/${projects[0].id}`;
    } else {
      location.hash = '';
    }
  }
  handleUpdateClick = () => {
    const projectId = this.props.projectListStore.project.id;
    location.hash = `/update/project/${projectId}`;
  }

  render() {

    const project = this.props.projectListStore.project;
    if (!project) {
      return null;
    }

    return (
      <div className="component-project-detail">
        {project.info.title}
          {/*<h2>{project.name}</h2>
          <p>{project.description}</p>
          <h3>环境</h3>
          <p>线上环境：{project.production || '无'}，测试环境：{project.testing || '无'}，开发环境：{project.development || '无'}</p>
          {project.apis && project.apis.map(api => {
            return <ApiDocs key={api.id.toString()} id={api.id.toString()} onApiDeleted={() => {}} />
          })}*/}
      </div>
    );
  }
}