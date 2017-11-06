// TODO
// 1. loading 状态
// 2. 请求失败的提示

import React from 'react';
import { inject, observer } from 'mobx-react';
import classnames from 'classnames';
import Tabs, { Tab } from 'material-ui/Tabs';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import { Save as SaveIcon } from 'material-ui-icons';
import SwipeableViews from 'react-swipeable-views';
import createHistory from 'history/createHashHistory';
const history = createHistory();

import Project from '../models/Project';
import SchemaEditor from '../components/schema-editor';
import SchemaForm from '../components/schema-form';

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
    this.props.uiStore.setCreateProjectTab(0);
  }

  handleSaveClick = async () => {
    const { app, uiStore } = this.props;
    const tempProject = app.tempProject;
    try {
      let swaggerObject = tempProject.getSwaggerObject();
      await Project.parse(swaggerObject);
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

  handleTabChange = (e, value) => {
    this.props.uiStore.setCreateProjectTab(value);
  }

  render() {
    const { app, uiStore } = this.props;
    const tempProject = app.tempProject;

    return (
      <div className="page-project-create">
<<<<<<< HEAD

        <Tooltip title="保存并提交" placement="bottom">
          <IconButton color="primary" className="tab-btn" onClick={this.handleSaveClick}>
            <SaveIcon />
          </IconButton>
        </Tooltip>
        <Tabs value={uiStore.createProjectTab} onChange={this.handleTabChange}>
          <Tab label="Editor" />
          <Tab label="Form" />
        </Tabs>
        {/* <SwipeableViews index={uiStore.createProjectTab}>
          <SchemaEditor spec={tempProject.spec} />
          <SchemaForm spec={tempProject.spec} />
        </SwipeableViews> */}
        {
          uiStore.createProjectTab === 0
          && <SchemaEditor spec={tempProject.spec} />
        }
        {
          uiStore.createProjectTab === 1
          && <SchemaForm spec={tempProject.spec} />
        }
=======
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
>>>>>>> b25b68b454517ef48929c7bd84e0c6b42e5aa60b
      </div>
    );
  }
}
