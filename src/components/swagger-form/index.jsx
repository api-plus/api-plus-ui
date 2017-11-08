// TODO
// 提示 path + method 重复

import React from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import { object, string } from 'prop-types';
import Card, { CardContent } from 'material-ui/Card';
import MenuItem from 'material-ui/Menu/MenuItem';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import { AddCircle, DeleteForever } from 'material-ui-icons';

import Operation from './Operation';
import store from './models'

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

@observer
class SwaggerForm extends React.Component {
  static propTypes = {
    initialValue: object.isRequired,
    classes: object.isRequired,
  };

  constructor(props) {
    super(props);
    store.swagger.init(props.initialValue);
  }

  handleTitleChange = (e, value) => {
  }

  // 新增一个 path
  handlePathAddClick = ({pathname, method}) => {
    const index = store.swagger.operationArr.findIndex(operation => 
      operation.pathname === pathname && operation.method === method
    );
    store.swagger.addOperation(index);
  }

  // 删除一个 path
  handlePathDeleteClick = ({pathname, method}) => {
    store.swagger.removeOperation(pathname, method);
  }
  
  render() {
    const { classes } = this.props;
    const swagger = store.swagger;
    const operations = swagger.operationArr;
    
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
              value={swagger.info.title}
              onChange={this.handleTitleChange}
            />
            <TextField
              className={`${classes.textField} ${classes.width20}`}
              id="version"
              label="Version"
              value={swagger.info.version}
              onChange={this.handleVersionChange}
            />
            <TextField
              fullWidth
              className={classes.textField}
              multiline
              id="description"
              label="Description"
              value={swagger.info.description}
              onChange={this.handleDescriptionChange}
            />
          </CardContent>
        </Card>

        {/* Operations */}
        {operations.map((operation, index) => (
          <Card className={classes.card} key={`${operation.pathname}-${operation.method}-${index}`}>
            <CardContent>
              <Typography className={classes.pathHeadline} type="headline" component="h2">
                <span>{operation.method.toUpperCase()} {operation.pathname}</span>
                <span className={classes.pathBtns}>
                  <Tooltip title="add a path" placement="top">
                    <IconButton onClick={this.handlePathAddClick.bind(this, operation)}>
                      <AddCircle />
                    </IconButton>
                  </Tooltip>
                  {
                    // 不能删除最后一个
                    operations.length > 1
                    && (
                      <Tooltip title="delete" placement="top">
                        <IconButton onClick={this.handlePathDeleteClick.bind(this, operation)}>
                          <DeleteForever />
                        </IconButton>
                      </Tooltip>
                    )
                  }
                </span>
              </Typography>
              <Operation 
                /* definitions={swagger.definitions}  */
                value={operation}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(SwaggerForm);
