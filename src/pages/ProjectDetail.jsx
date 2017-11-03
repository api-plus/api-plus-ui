import React from 'react';
import { inject, observer } from 'mobx-react';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/ModeEdit';

import ApiCard from '../components/api-card';
import Project from '../models/Project';
import './ProjectDetail.less';

@inject('app', 'uiStore') @observer
export default class ProcjectDetail extends React.Component {

  async componentDidMount() {
    const store = this.props.app;
    if (!store.projects.length) {
      await store.loadProjects();
    }
    const projectId = parseInt(this.props.match.params.id);
    const project = store.getProject(projectId);
    if (project) {
      store.setProject(project);
    } else {
      location.hash = '/404';
    }
  }

  handleDeleteClick = async () => {
    const { project, projects } = this.props.app;
    const { code } = await Project.del(project.id);
    this.props.app.removeProject(project.id);
    location.hash = '/';
  }

  handleEditClick = () => {
    const projectId = this.props.app.project.id;
    location.hash = `/edit/project/${projectId}`;
  }

  render() {
    const project = this.props.app.project;
    if (!project) return null;

    const schema = project.schema;
    return (
      <div className="component-project-detail">
        <div className="operation-btns">
          <Button className="btn" fab color="primary" onClick={this.handleEditClick}>
            <EditIcon />
          </Button>
          <Button className="btn" fab color="accent" onClick={this.handleDeleteClick}>
            <DeleteIcon />
          </Button>
        </div>
        <h1>{schema.info.title}</h1>
        <p>Version: {schema.info.version}</p>
        <p>{schema.info.description}</p>
        {/* <p>
          { schema.consumes && `请求类型: ${schema.consumes.join()}` }
          &nbsp;
          { schema.produces && `返回类型: ${schema.produces.join()}` }
        </p> */}
        {
          Object.entries(schema.paths).map(([path, methods]) => {
            return Object.entries(methods).map(([method, pathSchema]) => {
              return <ApiCard path={path} method={method} schema={pathSchema} />
            });
          })
        }

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
