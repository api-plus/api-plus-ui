import React from 'react';
import ReactDom from 'react-dom';
import AppLayout from '../components/layout';

ReactDom.render(
  <AppLayout />,
  document.querySelector('#root')
)

// 支持热替换
if (module.hot) {
  module.hot.accept();
}

