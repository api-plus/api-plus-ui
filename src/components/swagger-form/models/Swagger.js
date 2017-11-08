/* 

Swagger Object Model
https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#swagger-object

*/

import { observable } from 'mobx';
import Operation from './Operation';

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

  static defaultValue = {
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
    // Object.assign(this, Swagger.defaultValues, swagger);
  }

  init(swagger) {
    Object.assign(this, Swagger.defaultValue, swagger);
  }

  // 获取 operation 列表
  getOperations() {
    const operations = [];
    const pathnames = Object.keys(this.paths);
    for(let i = 0; i < pathnames.length; i++) {
      const pathname = pathnames[i];
      const pathItem = this.paths[pathname];
      const methods = Object.keys(pathItem);
      for(let j = 0; j < methods.length; j++) {
        const method = methods[j];
        const operation = pathItem[method];
        operations.push(new Operation({
          pathname, method, 
          ...operation
        }));
      }
    }
    return operations;
  }
}