import React from 'react';
import classnames from 'classnames';
import { object, string } from 'prop-types';
import { inject, observer } from 'mobx-react';
import SwaggerParser from 'swagger-parser/dist/swagger-parser';
import AceEditor from 'react-ace';
import { Button, Radio, Tooltip } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import { Save as SaveIcon, Code as CodeIcon } from 'material-ui-icons';

import Project from '../../models/Project';

import 'brace/mode/yaml';
import 'brace/mode/json';
import 'brace/theme/monokai';
import './index.less';

@inject('app', 'uiStore') @observer
class SchemaEditor extends React.Component {
  static propTypes = {
    schema: object
  };
  
  static defaultProps = {
    schema: {}
  };
  
  handleFormatClick = (value) => {
    const { app, uiStore } = this.props;
    const tempProject = app.tempProject;
    uiStore.setFormatMenuShow(false);
    if (value !== tempProject.format) {
      try {
        let spec = tempProject.getSwaggerString(value);
        tempProject.setSpec(spec);
        tempProject.setFormat(value);
        uiStore.setErrorMsg(null);
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
        tempProject.getSwaggerString();
        // if (tempProject.isYaml()) {
        //   Project.parse(tempProject.spec, tempProject.format);
        // } else {
        //   Project.parse(JSON.parse(tempProject.spec), tempProject.format);
        // }
        uiStore.setErrorMsg(null);
      } catch(e) {
        uiStore.setErrorMsg(e.message);
      }
    }
    app.tempProject.setSpec(value);
  }
  
  render() {
    const { app, uiStore } = this.props;
    const tempProject = app.tempProject;

    return (
      <div className={classnames('component-schema-editor', this.props.className)}>
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
          tabSize={2}
          onChange={this.handleSpecChange}
        />
      </div>
    );
  }
}


export default SchemaEditor;