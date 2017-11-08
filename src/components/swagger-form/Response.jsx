import React from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import { object, string } from 'prop-types';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import StatusCode from 'http-statuscode';

import store from './models';

const styles = theme => ({
  iptStatus: {
    width: '20%',
    paddingRight: '10px'
  },
  iptDesc: {
    width: '30%',
    paddingRight: '10px'
  },
});

@observer
class Response extends React.Component {
  static propTypes = {
    value: object.isRequired,
    classes: object.isRequired,
  };
  
  render() {
    const { classes, value } = this.props;

    return (
      <span className={this.props.className}>
        <TextField
          select
          label="Status Code"
          margin="normal"
          value={value.statusCode}
          className={classes.iptStatus}
        >
          {Object.values(StatusCode).map(code => 
            <MenuItem key={code} value={code.toString()}>{code}</MenuItem>
          )}
          <MenuItem key="default" value={'default'}>default</MenuItem>
        </TextField>
        <TextField
          label="Description"
          value={value.description}
          className={classes.iptDesc}
        />
        json-schema-editor
      </span>
    );
  }
}

export default withStyles(styles)(Response);