/* 

Operation Object Model
https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#operationObject

Expands pathname and method field from Official Operation Object

*/

import { action, observable } from 'mobx';
import Parameter from './Parameter';

export default class Operation {
  @observable pathname; // not in Official Operation Object
  @observable method; // not in Official Operation Object
  @observable tags;
  @observable summary;
  @observable description;
  @observable externalDocs;
  @observable operationId;
  @observable consumes;
  @observable produces;
  @observable parameters;
  @observable responses;
  @observable schemes;
  @observable deprecated;
  @observable security;

  static defaultValue = {
    pathname: '/api/pathname',
    method: 'get',
    tags: [],
    summary: '',
    description: '',
    externalDocs: {},
    operationId: '',
    consumes: ['application/json'],
    produces: ['application/json'],
    parameters: null,
    responses: {},
    schemes: ['http'],
    deprecated: false,
    security: []
  }

  constructor(operation) {
    Object.assign(this, Operation.defaultValue, operation);
    if (this.parameters) {
      this.parameters = this.parameters.map(parameter => new Parameter(parameter));
    }
  }

  @action
  addParameter(parameter = Parameter.defaultValue) {
    this.parameters = this.parameters || [];
    this.parameters.push(new Parameter(parameter));
  }
  
  @action
  removeParameter(index) {
    this.parameters.splice(index, 1);
    if (!this.parameters.length) {
      this.parameters = null;
    }
  }
}