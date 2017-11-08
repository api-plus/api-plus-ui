/* 

Operation Object Model
https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#operationObject

Expands pathname, method, responseArr field from Official Operation Object

*/

import { action, observable } from 'mobx';
import Parameter from './Parameter';
import Response from './Response';

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
  @observable responseArr; // this field is used for ui, not in Official Operation Object

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
    responses: {
      default: Response.defaultValue
    },
    schemes: ['http'],
    deprecated: false,
    security: [],
    responseArr: []
  }

  constructor(operation) {
    Object.assign(this, Operation.defaultValue, operation);
    // set parameters
    if (this.parameters) {
      this.parameters = this.parameters.map(parameter => new Parameter(parameter));
    }
    // set responses
    Object.entries(operation.responses).forEach(([statusCode, response]) => {
      const newResponse = new Response({
        statusCode,
        ...response
      });
      operation.responses[statusCode] = newResponse;
      this.responseArr.push(newResponse)
    });
  }

  @action
  addParameter(parameter) {
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
  
  @action
  addResponse(response) {
    const newResponse = new Response(response);
    this.responseArr.splice(0, 0, newResponse);
    if (response && !this.responses[response.statusCode]) {
      this.responses[response.statusCode] = newResponse;
    }
  }
  
  @action
  removeResponse(statusCode) {
    const index = this.responseArr.findIndex(response => response.statusCode === statusCode);
    this.responseArr.splice(index, 1);
  }
  
}