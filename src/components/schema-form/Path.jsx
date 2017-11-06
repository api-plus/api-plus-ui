import React from 'react';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { object, string } from 'prop-types';
import Card, { CardContent } from 'material-ui/Card';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';

import Parameter from './Parameter';

const styles = theme => ({
  width20: {
    width: '20%'
  },
  width30: {
    width: '30%'
  },
  width40: {
    width: '40%'
  },
  width60: {
    width: '60%'
  },
  width80: {
    width: '80%'
  },
  textField: {
    paddingRight: '10px'
  },
  fieldset: {
    borderColor: '#aaa',
    borderStyle: 'solid',
    borderWidth: '1px',
    margin: '10px 10px 0 0',
    color: '#666'
  }
});

class Path extends React.Component {
  static propTypes = {
    method: string,
    definitions: object,
    initialOperation: object,
    path: string.isRequired,
    classes: object.isRequired,
  };

  static defaultProps = {
    method: 'get',
    definitions: [],
    initialOperation: {
      description: '',
      produces: ['application/json'],
      consumes: ['application/json'],
      schemes: ['http'],
      parameters: [],
      responses: []
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      operation: props.initialOperation
    }
  }

  render() {
    const { operation } = this.state;
    const { classes, className, definitions, path, method } = this.props;

    const consumes = operation.consumes || ['application/json'];
    const produces = operation.produces || ['application/json'];
    
    return (
      <div className={classnames('component-schema-path', className)}>
        <TextField
          className={`${classes.textField} ${classes.width40}`}
          label="Path"
          value={path}
        />

        <TextField
          className={`${classes.textField} ${classes.width20}`}
          select
          label="Method"
          margin="normal"
          value={method}
        >
          <MenuItem value="get">GET</MenuItem>
          <MenuItem value="post">POST</MenuItem>
          <MenuItem value="put">PUT</MenuItem>
          <MenuItem value="put">DELETE</MenuItem>
        </TextField>


            <FormControl className={`${classes.textField} ${classes.width20}`}>
              <InputLabel>Consumes</InputLabel>
              <Select multiple value={consumes}>
                <MenuItem value="application/json">application/json</MenuItem>
                <MenuItem value="multipart/form-data">multipart/form-data</MenuItem>
                <MenuItem value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</MenuItem>
              </Select>
            </FormControl>

            <FormControl className={`${classes.textField} ${classes.width20}`}>
              <InputLabel>Produces</InputLabel>
              <Select multiple value={produces}>
                <MenuItem value="application/json">application/json</MenuItem>
                <MenuItem value="application/json">text/html</MenuItem>
              </Select>
            </FormControl>

        <TextField
          fullWidth
          label="Description"
          value={operation.description}
          className={classes.textField}
        />

        <fieldset className={classes.fieldset}>
          <legend>Parameters</legend>
          {
            operation.parameters && operation.parameters.map(parameter => <Parameter key={parameter.name} definitions={definitions} />)
          }
        </fieldset>
        <fieldset className={classes.fieldset}>
          <legend>Response</legend>
        </fieldset>
      </div>
    );
  }
}

export default withStyles(styles)(Path);