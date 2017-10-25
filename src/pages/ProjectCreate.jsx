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

@inject('projectListStore')
export default class ProjectCreate extends React.Component {

  componentWillMount() {
    const project = new Project({
      yaml: Project.defaultYaml
    });
    this.props.projectListStore.tempProject = project;
  }
  
  componentDidMount() {
    const store = this.props.projectListStore;
    if (!store.projects.length) {
      store.loadProjects();
    }
  }

  componentWillUnMount() {
    this.props.projectListStore.tempProject = null;
  }

  handleProjectChange = (value) => {
    this.props.projectListStore.tempProject.yaml = value;
  }

  handleSaveClick = async () => {
    const { data } = await Project.post({
      yaml: this.props.projectListStore.tempProject.yaml
    });

    const project = await Project.factory(data);
    const { projectListStore } = this.props;
    projectListStore.addProject(project);
    projectListStore.setProject(project);
    history.push(`/project/${data.id}`);
  }

  render() {
    const { tempProject } = this.props.projectListStore;
    
    return (
      <div className="page-project-create">
        <AceEditor 
          mode="yaml" 
          theme="monokai" 
          height="600px"
          width="100%"
          defaultValue={tempProject.yaml}
          onChange={this.handleProjectChange}
        />
        <br />
        <Button raised onClick={this.handleSaveClick}>取消</Button>
        <Button raised color="primary" onClick={this.handleSaveClick}>保存</Button>
      </div>
    );
  }
}
