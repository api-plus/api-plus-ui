import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { HashRouter, Link, Route } from 'react-router-dom';

import store from '../models';
import AppLayout from '../components/layout';

import ProjectList from './ProjectList';
import ProjectCreate from './ProjectCreate';
import ProjectUpdate from './ProjectUpdate';
import ProjectDetail from './ProjectDetail';
import ApiCreate from './ApiCreate';
import ApiUpdate from './ApiUpdate';
import ApiDetail from './ApiDetail';

import 'typeface-roboto';
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

ReactDOM.render(
  <Provider {...store}>
    <HashRouter>
      <AppLayout>
        <div gutter={10}>
          <div span={6}>
            <ProjectList />
          </div>
          <div span={18}>
            <Route exact path="/" component={Home}/>
            <Route path="/create/project" component={ProjectCreate}/>
            <Route path="/update/project/:id" component={ProjectUpdate}/>
            <Route path="/project/:id" component={ProjectDetail}/>
            <Route path="/create/api" component={ApiCreate}/>
            <Route path="/update/api/:id" component={ApiUpdate}/>
            <Route path="/api/:id" component={ApiDetail}/>
          </div>
        </div>
      </AppLayout>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);




// 支持热替换
if (module.hot) {
  module.hot.accept();
}
