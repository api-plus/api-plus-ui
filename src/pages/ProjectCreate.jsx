// TODO 
// 1. loading 状态
// 2. 请求失败的提示

import React from 'react';
import { func } from 'prop-types';
import { inject } from 'mobx-react';
import AceEditor from 'react-ace';
import { Button } from 'material-ui';
import createHistory from 'history/createHashHistory';
const history = createHistory();
import Project from '../models/Project';
import Ajax from '../components/ajax';

import brace from 'brace';
import 'brace/mode/yaml';
import 'brace/theme/monokai';

@inject('projectListStore')
export default class ProjectCreate extends React.Component {

  state = {
    spec: Project.sample
  }

  handleProjectChange = (value) => {
    this.setState({
      spec: value
    });
  }

  handleSaveClick = async () => {
    const { data } = await Project.create({
      spec: this.state.spec
    });

    const project = await Project.parse(data);
    const { projectListStore } = this.props;
    projectListStore.addProject(project);
    projectListStore.setProject(project);
    history.push(`/project/${data.id}`)
  }

  render() {
    
    const { spec } = this.state;
    return (
      <div className="page-project-create">
        <AceEditor 
          mode="yaml" 
          theme="monokai" 
          height="600px"
          width="100%"
          value={spec}
          onChange={this.handleProjectChange}
        />
        <br />
        <Button raised color="primary" onClick={this.handleSaveClick}>保存</Button>
      </div>
    );
  }
}
