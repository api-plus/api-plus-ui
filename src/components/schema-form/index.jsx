import React from 'react';
import classnames from 'classnames';
import { object, string } from 'prop-types';
import { inject, observer } from 'mobx-react';
import Card, { CardContent } from 'material-ui/Card';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import Project from '../../models/Project';
import Path from './Path';

@inject('app', 'uiStore') @observer
class SchemaForm extends React.Component {
  static propTypes = {
    schema: object.isRequired
  };

  handleTitleChange = (e, value) => {
    const { app, uiStore } = this.props;
    const tempProject = app.tempProject;
  }
  
  render() {
    const { app, schema, uiStore } = this.props;
    const tempProject = app.tempProject;
    const swaggerObject = tempProject.getSwaggerObject();
    
    return (
      <div className={classnames('component-schema-form', this.props.className)}>
        <Card>
          <CardContent>
            <Typography type="headline" component="h2">
              Info
            </Typography>
            <TextField
              fullWidth
              id="title"
              label="Title"
              value={swaggerObject.info.title}
              onChange={this.handleTitleChange}
            />
            <TextField
              fullWidth
              multiline
              id="description"
              label="Description"
              value={swaggerObject.info.description}
              onChange={this.handleDescriptionChange}
            />

          </CardContent>
        </Card>
        {Object.entries(schema.paths).map(([path, pathObj]) => {
          return Object.entries(pathObj).map(([method, operationObj]) => {
            return (
              <Card style={{marginTop: '10px'}}>
                <CardContent>
                  <Typography type="headline" component="h2">
                    {path} {method} 
                  </Typography>
                  <Path 
                    path={path} 
                    method={method} 
                    definitions={schema.definitions} 
                    initialOperation={operationObj}
                  />
                </CardContent>
              </Card>
            )
          })
        })}
      </div>
    );
  }
}


export default SchemaForm;