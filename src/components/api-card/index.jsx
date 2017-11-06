import React from 'react';
import { object, string } from 'prop-types';
import { Card, Typography } from 'material-ui';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';

import Project from '../../models/Project';
import SchemaPreivew from '../schema-preview';

import './index.less';

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
    return (
      <div className={`component-api-card ${method}`}>
        <Card>
          <div className="header">
            <Typography type="title">
              <span className="method">{method.toUpperCase()}</span>
              <span className="path">{path}</span>
            </Typography>
            <span className="summary">{schema.summary}</span>
          </div>
          <div className="body">
            <div>{schema.description}</div>

            {/* Parameters */}
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
                ? <p>&lt;None&gt;</p>
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
                          <TableCell>{parameter.required ? parameter.required.toString() : 'false'}</TableCell>
                          <TableCell>{parameter.type || <SchemaPreivew schema={parameter.schema} />}</TableCell>
                        </TableRow>
                      ))
                    }
                    </TableBody>
                  </Table>
                )
              }
            </div>

            {/* Responses */}
            <div className="responses">
              <div className="response-header">
                <h3>Responses</h3>
                {
                  schema.consumes
                  && <span className="content-type">Content-Type: {schema.consumes.join()}</span>
                }
              </div>
              {
                !schema.responses
                ? <p>&lt;None&gt;</p>
                : (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell className="response-code">Code</TableCell>
                        <TableCell className="response-description">Description</TableCell>
                        <TableCell className="response-schema">Model</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                      Object.entries(schema.responses).map(([code, res]) => (
                        <TableRow key={code}>
                          <TableCell>{code}</TableCell>
                          <TableCell>{res.description || '-'}</TableCell>
                          <TableCell>
                            {/* TODO ModelExample & Value */}
                            <SchemaPreivew schema={res.schema} />
                          </TableCell>
                        </TableRow>
                      ))
                    }
                    </TableBody>
                  </Table>
                )
              }
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default ApiCard;
