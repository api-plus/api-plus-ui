/* 

Path Item Object Model
https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#pathItemObject

*/

import { observable } from 'mobx';

export default class PathItem {

  static defaultValue = {
  }

  constructor(pathItem) {
    Object.assign(this, PathItem.defaultValue, pathItem);
  }
}