/* 

Response Object Model
https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#responseObject

Expands statusCode  field from Official Response Object

*/

import { observable } from 'mobx';

export default class Response {
  @observable statusCode;
  @observable description;
  @observable schema;
  @observable headers;
  @observable examples;

  static defaultValue = {
    statusCode: '200',
    description: '',
    schema: null,
    headers: null,
    examples: null
  }

  constructor(response) {
    Object.assign(this, Response.defaultValue, response);
  }
}