/* 

Swagger Object Model
https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#swagger-object

*/

import { observable } from 'mobx';

export default class Swagger {
  @observable swagger;
  @observable info;
  @observable host;
  @observable basePath;
  @observable schemes;
  @observable consumes;
  @observable produces;
  @observable paths;
  @observable definitions;
  @observable parameters;
  @observable responses;
  @observable securityDefinitions;
  @observable security;
  @observable tags;
  @observable externalDocs;

  static defaultValues = {
    swagger: '',
    info: {},
    host: '',
    basePath: '',
    schemes: [],
    consumes: [],
    produces: [],
    paths: {},
    definitions: {},
    parameters: {},
    responses: {},
    securityDefinitions: {},
    security: [],
    tags: [],
    externalDocs: {},
  }

  constructor(swagger) {
    Object.assign(this, Swagger.defaultValues, swagger);
  }

  getOperations() {

  }
}