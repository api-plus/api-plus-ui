// TODO
// 提示 path + method 重复

import React from 'react';
import classnames from 'classnames';
import { object, string } from 'prop-types';
import { inject, observer } from 'mobx-react';
import Card, { CardContent } from 'material-ui/Card';
import MenuItem from 'material-ui/Menu/MenuItem';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import { AddCircle, DeleteForever } from 'material-ui-icons';

import Path from './Path';

const styles = theme => ({
  width20: {
    width: '20%'
  },
  width80: {
    width: '80%'
  },
  textField: {
    paddingRight: '10px'
  },
  pathHeadline: {
    position: 'relative'
  },
  pathBtns: {
    position: 'absolute',
    right: 0,
    top: '-8px'
  },
  card: {
    marginBottom: '10px'
  }
});

@inject('app') @observer
class SchemaForm extends React.Component {
  static propTypes = {
    initialSchema: object.isRequired,
    classes: object.isRequired,
  };

  static defaultPath = {
    path: '/api/path',
    method: 'get',
    description: 'This is a description',
    responses: [],
  }

  constructor(props) {
    super(props);
    const swaggerObj = props.initialSchema;

    const pathArr = [];
    const paths = Object.keys(swaggerObj.paths);
    for(let i = 0; i < paths.length; i++) {
      const path = paths[i];
      const methods = Object.keys(swaggerObj.paths[path]);
      for(let j = 0; j < methods.length; j++) {
        const method = methods[j];
        const operationObj = swaggerObj.paths[path][method];
        pathArr.push({
          path, method, 
          ...operationObj
        });
      }
    }
    this.state = {
      info: swaggerObj.info,
      paths: pathArr,
      definitions: {}
    }
  }

  handleTitleChange = (e, value) => {
  }

  // 新增一个 path
  handlePathAddClick = (path) => {
    let paths = this.state.paths;
    const index = paths.find(item => (item.path === path.path && item.method === path.method))
    paths.splice(index, 0, {
      ...SchemaForm.defaultPath
    });
    this.setState({
      paths: [...paths]
    });
  }

  // 删除一个 path
  handlePathDeleteClick = (path) => {
    let paths = this.state.paths;
    const index = paths.find(item => (item.path === path.path && item.method === path.method))
    paths.splice(index, 1);
    this.setState({
      paths: [...paths]
    });
  }
  
  render() {
    const { classes } = this.props;
    const { definitions, info, paths } = this.state;
    
    return (
      <div className={classnames('schema-form', this.props.className)}>
        {/* Info */}
        <Card className={classes.card}>
          <CardContent>
            <Typography type="headline" component="h2">
              Info
            </Typography>
            <TextField
              className={`${classes.textField} ${classes.width80}`}
              id="title"
              label="Title"
              value={info.title}
              onChange={this.handleTitleChange}
            />
            <TextField
              className={`${classes.textField} ${classes.width20}`}
              id="version"
              label="Version"
              value={info.version}
              onChange={this.handleVersionChange}
            />
            <TextField
              fullWidth
              className={classes.textField}
              multiline
              id="description"
              label="Description"
              value={info.description}
              onChange={this.handleDescriptionChange}
            />
          </CardContent>
        </Card>

        {/* Paths */}
        {paths.map(path => (
          <Card className={classes.card} key={`${path.path}-${path.method}`}>
            <CardContent>
              <Typography className={classes.pathHeadline} type="headline" component="h2">
                <span>{path.method.toUpperCase()} {path.path}</span>
                <span className={classes.pathBtns}>
                  <Tooltip title="add a path" placement="top">
                    <IconButton onClick={this.handlePathAddClick.bind(this, path)}>
                      <AddCircle />
                    </IconButton>
                  </Tooltip>
                  {
                    // 不能删除最后一个
                    paths.length > 1
                    && (
                      <Tooltip title="delete" placement="top">
                        <IconButton onClick={this.handlePathDeleteClick.bind(this, path)}>
                          <DeleteForever />
                        </IconButton>
                      </Tooltip>
                    )
                  }
                </span>
              </Typography>
              <Path 
                path={path.path} 
                method={path.method} 
                definitions={definitions} 
                initialOperation={path}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(SchemaForm);
