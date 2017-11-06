import React from 'react';
import classnames from 'classnames';
import { object, string } from 'prop-types';
import { inject, observer } from 'mobx-react';
import Card, { CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import Project from '../../models/Project';

@inject('app', 'uiStore') @observer
class SchemaForm extends React.Component {
  static propTypes = {
    schema: object
  };
  
  static defaultProps = {
    schema: {}
  };

  handleTitleChange = (e, value) => {
    const { app, uiStore } = this.props;
    const tempProject = app.tempProject;
  }
  
  render() {
    const { app, uiStore } = this.props;
    const tempProject = app.tempProject;
    const swaggerObject = tempProject.getSwaggerObject();
    
    return (
      <div className={classnames('component-schema-form', this.props.className)}>
        <Card>
          <CardContent>
            <TextField
              fullWidth
              id="title"
              label="Title"
              value={swaggerObject.info.title}
              onChange={this.handleTitleChange}
            />
          </CardContent>
        </Card>
      </div>
    );
  }
}


export default SchemaForm;