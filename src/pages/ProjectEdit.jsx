// TODO 
// 1. loading 状态
// 2. 请求失败的提示

import React from 'react';
import { inject, observer } from 'mobx-react';
import AceEditor from 'react-ace';
import { Button } from 'material-ui';
import createHistory from 'history/createHashHistory';
const history = createHistory();
import Project from '../models/Project';

import 'brace/mode/yaml';
import 'brace/theme/monokai';

@inject('projectListStore') @observer
export default class ProjectEdit extends React.Component {

  async componentDidMount() {
    const store = this.props.projectListStore;
    if (!store.projects.length) {
      await store.loadProjects();
    }

    const projectId = parseInt(this.props.match.params.id);
    const project = store.getProject(projectId);
    if (project) {
      store.setProject(project);
      store.tempProject = new Project({
        id: project.id,
        yaml: project.yaml
      });
    } else {
      location.hash = '/404';
    }
  }
  
  componentWillUnMount() {
    this.props.projectListStore.tempProject = null;
  }

  handleProjectChange = (value) => {
    this.props.projectListStore.tempProject.yaml = value;
  }

  handleSaveClick = async () => {
    const store = this.props.projectListStore;
    const { id, yaml } = store.tempProject;
    await Project.put({ id, yaml });
    const project = await Project.factory({ id, yaml });
    store.project.update(project);
    history.push(`/project/${project.id}`);
  }

  render() {
    const { tempProject } = this.props.projectListStore;
    if (!tempProject) return null;

    return (
      <div className="page-project-create">
        <AceEditor 
          mode="yaml" 
          theme="monokai" 
          height="600px"
          width="100%"
          value={tempProject.yaml}
          onChange={this.handleProjectChange}
        />
        <br />
        <Button raised onClick={this.handleSaveClick}>取消</Button>
        <Button raised color="primary" onClick={this.handleSaveClick}>保存</Button>
      </div>
    );
  }
}
