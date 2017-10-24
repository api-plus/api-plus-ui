import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Home from '../../pages/Home';
import ProjectCreate from '../../pages/ProjectCreate';
import ProjectDetail from '../../pages/ProjectDetail';
import PathDetail from '../../pages/PathDetail';

export default class AppRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        <div className="layout-content">
          <Route exact path="/" component={Home}/>
          <Route path="/create/project" component={ProjectCreate}/>
          <Route path="/project/:id" component={ProjectDetail}/>
        </div>
      </HashRouter>
    )
  }
}