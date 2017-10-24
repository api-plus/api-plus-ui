import { action, observable } from 'mobx';

export default class UI {
  @observable pageTitle = 'Api Plus';

  @action
  setPageTitle(title) {
    this.pageTitle = title;
  }
}