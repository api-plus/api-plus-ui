import React from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import { object, array } from 'prop-types';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';

import store from './models';

const styles = theme => ({
  iptName: {
    width: '20%',
    paddingRight: '10px'
  },
  iptDesc: {
    width: '30%',
    paddingRight: '10px'
  },
  iptIn: {
    width: '15%',
    paddingRight: '10px'
  },
  iptRequired: {
    width: '10%',
    paddingRight: '10px'
  },
  iptSchema: {
    width: '25%',
    paddingRight: '10px'
  },
  iptType: {
    width: '25%',
    paddingRight: '10px'
  },
});

@observer
class Parameter extends React.Component {
  static propTypes = {
    value: object.isRequired,
    classes: object.isRequired,
  };
  
  render() {
    const { classes } = this.props;
    const parameter = this.props.value;
    const definitions = store.swagger.definitions;

    return (
      <span className={classnames('component-schema-parameter', this.props.className)}>
        <TextField
          label="Name"
          value={parameter.name}
          className={classes.iptName}
        />
        <TextField
          label="Description"
          value={parameter.description}
          className={classes.iptDesc}
        />
        <TextField
          select
          label="Required"
          margin="normal"
          value={parameter.required.toString()}
          className={classes.iptRequired}
        >
          <MenuItem value={'true'}>Yes</MenuItem>
          <MenuItem value={'false'}>No</MenuItem>
        </TextField>
        <TextField
          select
          label="Located In"
          margin="normal"
          value={parameter.locatedIn}
          className={classes.iptIn}
        >
          <MenuItem value={'query'}>query</MenuItem>
          <MenuItem value={'header'}>header</MenuItem>
          <MenuItem value={'path'}>path</MenuItem>
          <MenuItem value={'formData'}>formData</MenuItem>
          <MenuItem value={'body'}>body</MenuItem>
        </TextField>
        {
          parameter.locatedIn === 'body' 
          ? (
            <TextField
              select
              label="Schema"
              margin="normal"
              value={parameter.schema || 'empty'}
              className={classes.iptSchema}
            >
              {Object.keys(definitions).map(def => 
                <MenuItem key={def} value={def}>{def.replace('#/definitions/', '')}</MenuItem>
              )}
              <MenuItem key={'empty'} value={'empty'}>Empty Object</MenuItem>
            </TextField>
          )
          : (
            <TextField
              select
              label="Type"
              margin="normal"
              value={parameter.type}
              className={classes.iptType}
            >
              <MenuItem value={'string'}>string</MenuItem>
              <MenuItem value={'number'}>number</MenuItem>
              <MenuItem value={'integer'}>integer</MenuItem>
              <MenuItem value={'boolean'}>boolean</MenuItem>
            </TextField>
          )
        }
      </span>
    );
  }
}

export default withStyles(styles)(Parameter);