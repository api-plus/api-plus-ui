import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('app', 'uiStore')
export default class Home extends React.Component {

  componentDidMount() {
    const store = this.props.app;
    if (!store.projects.length) {
      store.loadProjects();
    }
    const uiStore = this.props.uiStore;
    uiStore.setPageTitle('总览');
  }

  render() {
    return (
      <div className="page-home">
        <h1>欢迎来到 Api Plus ! </h1>
        请从左边选择一个项目，或<Link to="/create/project">新建一个项目</Link>
      </div>
    );
  }
}
