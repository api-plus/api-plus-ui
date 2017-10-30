import React from 'react';
import { object, string } from 'prop-types';

function SchemaPreview(props) {
  return (
    <pre>{JSON.stringify(props.schema, null, 2)}</pre>
  );
}

SchemaPreview.propTypes = {
  schema: object
};

SchemaPreview.defaultProps = {
  schema: {}
};

export default SchemaPreview;