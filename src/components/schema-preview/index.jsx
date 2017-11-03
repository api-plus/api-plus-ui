import React from 'react';
import { object, string } from 'prop-types';
import JSONSchemaView from 'json-schema-view-js';

import './index.less';

export default class SchemaPreview extends React.Component {

  static PropTypes = {
    schema: object
  }

  static defaultProps = {
    schema: {}
  }

  componentDidMount() {
    const view = new JSONSchemaView(this.props.schema);
    const modelDom = view.render();
    this.schemaRef.appendChild(modelDom);
  }

  saveSchemaRef = (ref) => {
    this.schemaRef = ref;
  }

  render() {
    const isPreviewSchema = this.props.isPreviewSchema;
    return (
      // <pre style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(this.props.schema, null, 2)}</pre>
      <div className="schema-preview" ref={this.saveSchemaRef}></div>
    );
  }
}
