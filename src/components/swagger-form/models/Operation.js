/* 

Operation Object Model
https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#operationObject

Expands pathname and method field from OperationObject

*/

import { observable } from 'mobx';

export default class Operation {
  @observable pathname; // not in Swagger Operation Object
  @observable method; // not in Swagger Operation Object
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

  static defaultValues = {
    pathname: '/api/pathname',
    method: 'get',
    tags: [],
    summary: '',
    description: '',
    externalDocs: {},
    operationId: '',
    consumes: [],
    produces: [],
    parameters: [],
    responses: {},
    schemes: [],
    deprecated: false,
    security: []
  }

  constructor(operation) {
    Object.assign(this, Operation.defaultValues, operation);
  }
}