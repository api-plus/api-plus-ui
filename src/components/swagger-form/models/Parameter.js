/* 

Parameter Object Model
https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#parameterObject

*/

import { observable } from 'mobx';

export default class Parameter {
  @observable name;
  @observable locatedIn; // Possible values are "query", "header", "path", "formData" or "body".
  @observable description;
  @observable required;
  @observable schema;
  @observable type;
  @observable items; // Required if type is "array". Describes the type of items in the array.

  // @observable format;
  // @observable allowEmptyValue;
  // @observable default;
  // @observable maximum;
  // @observable minimum;
  // @observable enum;

  static defaultValue = {
    name: '',
    locatedIn: 'query',
    description: '',
    required: false,
    schema: null,
    type: 'string',
    items: null,
  }

  constructor(parameter) {
    if (parameter && parameter.in) {
      parameter.locatedIn = parameter.in;
    }
    Object.assign(this, Parameter.defaultValue, parameter);
  }
}