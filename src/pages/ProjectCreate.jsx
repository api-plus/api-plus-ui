// TODO 
// 1. loading 状态
// 2. 请求失败的提示

import React from 'react';
import { inject, observer } from 'mobx-react';
import SwaggerParser from 'swagger-parser/dist/swagger-parser';
import AceEditor from 'react-ace';
import { Button, Radio, Tooltip } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import { Save as SaveIcon, Code as CodeIcon } from 'material-ui-icons';
import createHistory from 'history/createHashHistory';
const history = createHistory();

import Project from '../models/Project';

import 'brace/mode/yaml';
import 'brace/mode/json';
import 'brace/theme/monokai';
import './ProjectCreate.less';

@inject('app', 'uiStore') @observer
export default class ProjectCreate extends React.Component {

  componentWillMount() {
    const project = new Project({
      spec: Project.defaultSpec
    });
    this.props.app.setTempProject(project);
  }
  
  componentDidMount() {
    const store = this.props.app;
    if (!store.projects.length) {
      store.loadProjects();
    }
  }

  componentWillUnmount() {
    this.props.app.setTempProject(null);
  }

  handleFormatClick = (value) => {
    // TODO
    // 先校验
    // 如果校验不通过，展示错误信息
    // 如果校验通过，再切换到新的 format
    const { app, uiStore } = this.props;
    const tempProject = app.tempProject;
    uiStore.setFormatMenuShow(false);
    if (value !== tempProject.format) {
      try {
        let spec = '';
        tempProject.checkFormat();
        if (tempProject.isYaml()) {
          let specObj = SwaggerParser.YAML.parse(tempProject.spec);
          spec = JSON.stringify(specObj, null, 2);
        } else {
          let specObj = JSON.parse(tempProject.spec);
          spec = SwaggerParser.YAML.stringify(specObj);
        }
        tempProject.setSpec(spec);
        tempProject.setFormat(value);
      } catch(e) {
        uiStore.setErrorMsg(e.message);
      }
    }
  }
  handleFormatMenuShow = (e) => {
    this.props.uiStore.setAnchorElm(e.target);
    this.props.uiStore.setFormatMenuShow(true);
  }
  handleFormatMenuHide = () => {
    this.props.uiStore.setAnchorElm(null);
    this.props.uiStore.setFormatMenuShow(false);
  }

  handleSpecChange = (value) => {
    const { app, uiStore } = this.props;
    const tempProject = app.tempProject;

    if (uiStore.errorMsg) {
      try {
        let spec = '';
        if (tempProject.isYaml()) {
          Project.parse(tempProject.spec, tempProject.format);
        } else {
          Project.parse(JSON.parse(tempProject.spec), tempProject.format);
        }
        uiStore.setErrorMsg(null);
      } catch(e) {
        uiStore.setErrorMsg(e.message);
      }
    }
    app.tempProject.setSpec(value);
  }

  handleSaveClick = async () => {
    const { app, uiStore } = this.props;
    const tempProject = app.tempProject;
    try {
      tempProject.checkFormat();
      let specObj = {};
      if (tempProject.isYaml()) {
        specObj = SwaggerParser.YAML.parse(tempProject.spec);
      } else {
        specObj = JSON.parse(tempProject.spec);
      }
      await Project.validate(specObj);
      uiStore.setErrorMsg(null);
    } catch(e) {
      uiStore.setErrorMsg(decodeURI(e.message));
      return;
    }

    const { data } = await Project.post({
      spec: app.tempProject.spec
    });

    const project = await Project.factory(data);
    app.addProject(project);
    app.setProject(project);
    history.push(`/project/${data.id}`);
  }

  render() {
    const { app, uiStore } = this.props;
    const tempProject = app.tempProject;

    return (
      <div className="page-project-create">
        <div className="btns-container">
          <Tooltip title="切换 JSON / YAML 格式" placement="bottom">
            <IconButton className="btn" onClick={this.handleFormatMenuShow}>
              <CodeIcon />
            </IconButton>
          </Tooltip>
          <Menu
            id="simple-menu"
            anchorEl={uiStore.anchorElm}
            open={uiStore.isFormatMenuShow}
            onRequestClose={this.handleFormatMenuHide}
          >
            <MenuItem 
              selected={tempProject.isYaml()} 
              onClick={this.handleFormatClick.bind(this, 'yaml')}
            >
              YAML
            </MenuItem>
            <MenuItem 
              key="json"
              selected={!tempProject.isYaml()} 
              onClick={this.handleFormatClick.bind(this, 'json')}
            >
              JSON
            </MenuItem>
          </Menu>
          <Tooltip title="保存并提交" placement="bottom">
            <IconButton className="btn" onClick={this.handleSaveClick}>
              <SaveIcon/>
            </IconButton>
          </Tooltip>
        </div>
        {
          uiStore.errorMsg && 
          <div className="error-container">
            <pre>
            Error: {uiStore.errorMsg}
            </pre>
          </div>
        }
        <AceEditor 
          mode={tempProject.format}
          theme="monokai" 
          height="600px"
          width="100%"
          value={tempProject.spec}
          onChange={this.handleSpecChange}
        />
      </div>
    );
  }
}
