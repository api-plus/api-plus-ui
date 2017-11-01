import { action, observable } from 'mobx';

export default class UI {
  @observable pageTitle = 'Api Plus';
  @observable isDrawerOpen = true;
  @observable anchorElm = null; // 创建 project 页面的锚点元素
  @observable isFormatMenuShow = false;
  @observable errorMsg = null;
  
  @action
  setErrorMsg(errorMsg) {
    this.errorMsg = errorMsg;
  }
  
  @action
  setFormatMenuShow(isFormatMenuShow) {
    this.isFormatMenuShow = isFormatMenuShow;
  }

  @action
  setAnchorElm(anchorElm) {
    this.anchorElm = anchorElm;
  }
  
  @action
  setPageTitle(title) {
    this.pageTitle = title;
  }

  @action
  setDrawerOpen(isDrawerOpen) {
    this.isDrawerOpen = isDrawerOpen;
  }
}