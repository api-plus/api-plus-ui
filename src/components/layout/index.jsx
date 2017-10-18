import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';


import './index.less';


// export default class Homepage extends React.Component {
//
//   render() {
//     return (
//       <Layout>
//         <Header className="layout-header">
//           <div className="layout-brand"><a href="#/"></a></div>
//         </Header>
//         <Content className="layout-content layout-centent-home">
//           {this.props.children}
//         </Content>
//         <Footer className="layout-footer">
//           <ul>
//             <li>Enjoy Api Documents</li>
//           </ul>
//         </Footer>
//       </Layout>
//     );
//   }
// }

export default class Homepage extends Component {

  render() {
    return (
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

        </nav>
        <div className="layout-content">

        </div>
      </div>
    );
  }
}
