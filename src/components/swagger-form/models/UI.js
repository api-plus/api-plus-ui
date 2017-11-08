/* UI model for swagger form */

import { action, observable } from 'mobx';
import Operation from './Operation';

export default class UI {
  @observable operations = [];
}