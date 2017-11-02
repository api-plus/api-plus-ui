import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Home from '../../pages/Home';
import ProjectCreate from '../../pages/ProjectCreate';
import ProjectEdit from '../../pages/ProjectEdit';
import ProjectDetail from '../../pages/ProjectDetail';

export default class AppRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        <div className="layout-content">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/create/project" component={ProjectCreate}/>
            <Route path="/edit/project/:id" component={ProjectEdit}/>
            <Route path="/project/:id" component={ProjectDetail}/>
            <Route component={NoMatch}/>
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

const NoMatch = ({ location }) => (
  <div>
    <h1>404</h1>
    <p>No match for <code>{location.pathname}</code></p>
  </div>
);
