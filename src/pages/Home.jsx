import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { HashRouter, Link, Route } from 'react-router-dom';
import createHistory from 'history/createHashHistory';
const history = new createHistory();

import store from '../models';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import MenuIcon from 'material-ui-icons/Menu';

import AppToolBar from '../components/toolbar';
import ProjectList from './ProjectList';
import ProjectCreate from './ProjectCreate';
import ProjectDetail from './ProjectDetail';
import PathDetail from './PathDetail';

// import './Home.less';

export default class Home extends React.Component {
  render() {
    return (
      <div className="page-home">
        <h1>欢迎来到 Api Plus ! </h1>
        请从左边选择一个项目，或<Link to="/create/project">新建一个项目</Link>
      </div>
    );
  }
}