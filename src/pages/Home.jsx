import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { HashRouter, Link, Route } from 'react-router-dom';

import store from '../models';

import Typography from 'material-ui/Typography';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import MenuIcon from 'material-ui-icons/Menu';

import ProjectList from './ProjectList';

import './Home.less';



class Home extends React.Component {
  render() {
    return (
      <div className="page-home">
        <h1>欢迎来到 Api Plus ! </h1>
        请从左边选择一个项目，或<Link to="/create/project">新建一个项目</Link>
      </div>
    );
  }
}


export default class Homepage extends Component {

  render() {
    return (
      <Provider {...store}>
        <HashRouter>
          <div className="layout-container">
            <AppBar className="layout-header">
              <Toolbar>
                {/* <IconButton color="contrast" aria-label="Menu">
                  <MenuIcon />
                </IconButton> */}
                <Typography type="title" color="inherit" >
                  总览
                </Typography>
              </Toolbar>
            </AppBar>
            <nav className="layout-nav">
              <div className="layout-nav-logo">
                {/* <a href=""> Api Plus</a> */}
                <Button className="add-button" fab aria-label="add">
                  <Link to="/create/project"><AddIcon /></Link>
                </Button>
              </div>
              <ProjectList />
            </nav>
            <div className="layout-content">
              <Route exact path="/" component={Home}/>
              {/* <Route path="/create/project" component={ProjectCreate}/>
              <Route path="/update/project/:id" component={ProjectUpdate}/>
              <Route path="/project/:id" component={ProjectDetail}/>
              <Route path="/create/api" component={ApiCreate}/>
              <Route path="/update/api/:id" component={ApiUpdate}/>
              <Route path="/api/:id" component={ApiDetail}/> */}
            </div>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

render(
  <Homepage />,
  document.querySelector('#root')
)

// 支持热替换
if (module.hot) {
  module.hot.accept();
}
