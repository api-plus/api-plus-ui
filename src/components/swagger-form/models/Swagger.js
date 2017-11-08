/* 

Swagger Object Model
https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#swagger-object

Expands pathname, method, responseArr field from Official Operation Object

*/

import { action, observable } from 'mobx';
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
  @observable operationArr; // this field is used for ui, not in Official Operation Object
  
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
    parameters: null,
    responses: null,
    securityDefinitions: {},
    security: [],
    tags: [],
    externalDocs: {},
    operationArr: []
  }

  constructor(swagger) {
    // Object.assign(this, Swagger.defaultValues, swagger);
  }

  init(swagger) {
    Object.assign(this, Swagger.defaultValue, swagger);
    this.operationArr = this.setOperationArr();
  }

  // 获取 operation 列表
  setOperationArr() {
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
  
  /* 
    添加 operation
    @param index <number> the location where new operation obj should be inserted to
    @param operation <object> the new operation data
  */
  @action
  addOperation(index = 0, operation = Operation.defaultValue) {
    this.operationArr.splice(index, 0, new Operation(operation));
  }

  @action
  removeOperation(pathname, method) {
    const index = this.operationArr.findIndex(operation => 
      operation.pathname === pathname && operation.method === method
    );
    this.operationArr.splice(index, 1);
  }
}