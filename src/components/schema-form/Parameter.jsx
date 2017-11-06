import React from 'react';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { object, string } from 'prop-types';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  width20: {
    width: '20%'
  },
  width30: {
    width: '30%'
  },
  width50: {
    width: '50%'
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

class Parameters extends React.Component {
  static propTypes = {
    initialData: object,
    definitions: object,
    classes: object.isRequired,
  };

  static defaultProps = {
    initialData: {
      name: '',
      description: '',
      in: 'query',
      required: false,
      type: 'string'
    },
    definitions: []
  };

  constructor(props) {
    super(props);
    this.state = {
      parameter: props.initialData
    }
  }
  
  render() {
    const { classes, definitions } = this.props;
    const { parameter } = this.state;
    
    return (
      <div className={classnames('component-schema-parameter', this.props.className)}>
        <TextField
          label="Name"
          value={parameter.name}
          className={classes.textField}
        />
        <TextField
          label="Description"
          value={parameter.description}
          className={classes.textField}
        />
        <TextField
          select
          label="Located In"
          margin="normal"
          value={parameter.in}
          className={classes.textField}
        >
          <MenuItem value={'query'}>query</MenuItem>
          <MenuItem value={'header'}>header</MenuItem>
          <MenuItem value={'path'}>path</MenuItem>
          <MenuItem value={'formData'}>formData</MenuItem>
          <MenuItem value={'body'}>body</MenuItem>
        </TextField>
        <TextField
          select
          label="Required"
          margin="normal"
          value={parameter.required.toString()}
          className={classes.textField}
        >
          <MenuItem value={'true'}>Yes</MenuItem>
          <MenuItem value={'false'}>No</MenuItem>
        </TextField>
        {
          parameter.in === 'body' 
          ? (
            <TextField
              select
              label="Schema"
              margin="normal"
              value={parameter.schema}
              className={classes.textField}
            >
              {definitions.map(def => {
                return <MenuItem value={def}>{def.replace('#/definitions/', '')}</MenuItem>
              })}
            </TextField>
          )
          : (
            <TextField
              select
              label="Type"
              margin="normal"
              value={parameter.type}
              className={classes.textField}
            >
              <MenuItem value={'string'}>string</MenuItem>
              <MenuItem value={'number'}>number</MenuItem>
              <MenuItem value={'integer'}>integer</MenuItem>
              <MenuItem value={'boolean'}>boolean</MenuItem>
            </TextField>
          )
        }
      </div>
    );
  }
}

export default withStyles(styles)(Parameters);