/* UI model for swagger form */

import { action, observable } from 'mobx';
import Operation from './Operation';

export default class UI {
  @observable operations = [];

  /* 
    添加 operation
    @param index <number> the location where new operation obj should be inserted to
    @param operation <object> the new operation data
  */
  @action
  addOperation(index = 0, operation = Operation.defaultValue) {
    this.operations.splice(index, 0, new Operation(operation));
  }

  @action
  removeOperation(pathname, method) {
    const index = this.operations.findIndex(operation => 
      operation.pathname === pathname && operation.method === method
    );
    this.operations.splice(index, 1);
  }
}