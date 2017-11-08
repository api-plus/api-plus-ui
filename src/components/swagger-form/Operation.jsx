import React from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import { object, array } from 'prop-types';
import Card, { CardContent } from 'material-ui/Card';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import MenuItem from 'material-ui/Menu/MenuItem';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import Typography from 'material-ui/Typography';
import { RemoveCircleOutline } from 'material-ui-icons';

import Parameter from './Parameter';

const styles = theme => ({
  width20: {
    width: '20%'
  },
  width40: {
    width: '40%'
  },
  textField: {
    paddingRight: '10px'
  },
  subheading: {
    paddingTop: '25px'
  },
  noData: {
    color: '#999',
    fontSize: '80%'
  },
  parameterForm: {
    width: '95%',
    display: 'inline-block'
  },
  removeBtn: {
    color: '#666',
    cursor: 'pointer',
    width: '5%'
  },
  smallLinkBtn: {
    color: theme.palette.background.primary,
    fontSize: '80%'
  },
  fieldset: {
    borderColor: '#aaa',
    borderStyle: 'solid',
    borderWidth: '1px',
    margin: '10px 10px 0 0',
    color: '#666'
  }
});

@observer
class Operation extends React.Component {

  static propTypes = {
    definitions: array,
    value: object.isRequired,
    classes: object.isRequired,
  };

  static defaultProps = {
    definitions: []
  };

  static defaultPath = {
    path: '/api/new/path',
    method: 'get',
    description: 'This is a description',
    responses: [],
  };

  handleParamAddClick = () => {
    this.props.value.addParameter();
  }
  handleParamRemoveClick = (index) => {
    this.props.value.removeParameter(index);
  }

  render() {
    const { classes, className, definitions } = this.props;
    const operation = this.props.value;

    return (
      <div className={classnames('schema-form-operation', className)}>
        <TextField
          className={`${classes.textField} ${classes.width40}`}
          label="Path"
          value={operation.pathname}
        />

        <TextField
          className={`${classes.textField} ${classes.width20}`}
          select
          label="Method"
          margin="normal"
          value={operation.method}
        >
          <MenuItem value="get">GET</MenuItem>
          <MenuItem value="post">POST</MenuItem>
          <MenuItem value="put">PUT</MenuItem>
          <MenuItem value="put">DELETE</MenuItem>
        </TextField>

        <FormControl className={`${classes.textField} ${classes.width20}`}>
          <InputLabel>Consumes</InputLabel>
          <Select multiple value={Array.from(operation.consumes)}>
            <MenuItem value="application/json">application/json</MenuItem>
            <MenuItem value="multipart/form-data">multipart/form-data</MenuItem>
            <MenuItem value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={`${classes.textField} ${classes.width20}`}>
          <InputLabel>Produces</InputLabel>
          <Select multiple value={Array.from(operation.produces)}>
            <MenuItem value="application/json">application/json</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Description"
          value={operation.description}
          className={classes.textField}
        />

        <Typography className={classes.subheading} type="subheading" component="h3">
          Parameters 
        </Typography>
        {
          operation.parameters
          ? operation.parameters.map((parameter, i) => (
              <div key={`${parameter.name}-${i}`}>
                <Parameter className={classes.parameterForm} value={parameter} />
                <RemoveCircleOutline 
                  className={classes.removeBtn} 
                  onClick={this.handleParamRemoveClick.bind(this, i)} 
                />
              </div>
            ))
          : <span className={classes.noData}>No Parameters &nbsp;</span>
        }
        <a className={classes.smallLinkBtn} href="javascript: void(0);" onClick={this.handleParamAddClick}>+ Add One</a>
        
        <Typography className={classes.subheading} type="subheading" component="h3">
          Responses
        </Typography>
        <span className={classes.noData}>No Responses &nbsp;</span>
        <a className={classes.smallLinkBtn} href="javascript: void(0);" onClick={this.handleResAddClick}>+ Add One</a>

      </div>
    );
  }
}

export default withStyles(styles)(Operation);