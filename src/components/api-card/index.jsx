import React from 'react';
import { object, string } from 'prop-types';
import { inject, observer } from 'mobx-react';
import Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import Project from '../../models/Project';

import './index.less'

@inject('projectListStore') @observer
class ApiCard extends React.Component {

  static propTypes = {
    path: string,
    method: string,
    schema: object
  }

  static defaultProps = {
    path: null,
    method: null,
    schema: null
  }

  render() {
    let { path, method, schema } = this.props;

    if (!schema) return null;
    console.log(schema.parameters)
    return (
      <div className={`component-api-card ${method}`}>
        <Card>
          <div className="header">
            <span className="method">{method.toUpperCase()}</span>
            <span className="path">{path}</span>
            <span className="summary">{schema.summary}</span>
          </div>
          <div className="body">
            <div>{schema.description}</div>
            <div className="parameters">
              <div className="parameter-header">
                <h3>Parameters</h3>
                {
                  schema.produces 
                  && <span className="content-type">Content-Type: {schema.produces.join()}</span>
                }
              </div>
              {
                !schema.parameters
                ? <p>&lt; None &gt;</p>
                : (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Located in</TableCell>
                        <TableCell>Required</TableCell>
                        <TableCell>Data Type | Schema</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                      schema.parameters.map(parameter => (
                        <TableRow key={parameter.name}>
                          <TableCell>{parameter.name}</TableCell>
                          <TableCell>{parameter.description || '-'}</TableCell>
                          <TableCell>{parameter.in || '-'}</TableCell>
                          <TableCell>{parameter.required.toString()}</TableCell>
                          <TableCell>{parameter.type || JSON.stringify(parameter.schema)}</TableCell>
                        </TableRow>
                      ))
                    }
                    </TableBody>
                  </Table>
                )
              }
              
            </div>
            <div className="responses">
              <div className="response-header">
                <h3>Responses</h3>
                {
                  schema.consumes 
                  && <span className="content-type">Content-Type: {schema.consumes.join()}</span>
                }
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default ApiCard;