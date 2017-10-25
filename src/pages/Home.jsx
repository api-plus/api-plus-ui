import React from 'react';
import { Link } from 'react-router-dom';

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