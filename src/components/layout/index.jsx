/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'mobx-react';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  IconButton,
  Hidden,
  Divider,
  Button
} from 'material-ui';
import { withStyles, createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import MenuIcon from 'material-ui-icons/Menu';
import { red, grey, blue } from 'material-ui/colors';

import store from '../../models';
import AppRouter from '../app-router';
import ProjectList from '../../pages/ProjectList';

const drawerWidth = 280;

const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
      boxSizing: 'border-box',
      '@media print': {
        background: theme.palette.common.white,
      },
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    body: {
      margin: 0,
    },
    a: {
      color: red[500],
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      }
    },
  },
  root: {
    width: '100%',
    height: '100vh',
    zIndex: 1,
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'fixed',
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  drawerHeader: {
    padding:' 0 24px',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'center',
    ...theme.mixins.toolbar
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
      position: 'fixed',
      height: '100%',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('lg')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  version: {
    display: 'inline-block',
    marginBottom: 4,
    marginLeft: 10,
    fontSize: 12,
  },
  menuHeaderLink: {
    transition: 'all .2s',
    color: grey[700],
    '&:hover': {
      textDecoration: 'none',
      color: red[500]
    }
  }
});

class Layout extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes } = this.props;
    const theme = createMuiTheme({
      palette: {
        primary: blue
      },
    });
    return (
      <Provider {...store}>
        <MuiThemeProvider theme={theme}>
          <div className={classes.root}>
            <div className={classes.appFrame}>
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton
                    color="contrast"
                    aria-label="open drawer"
                    onClick={this.handleDrawerToggle}
                    className={classes.navIconHide}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography type="title" color="inherit" noWrap>
                    {store.uiStore.pageTitle}
                  </Typography>
                </Toolbar>
              </AppBar>
              {/* 小屏的menu */}
              <Hidden lgUp>
                <Drawer
                  type="temporary"
                  anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                  open={this.state.mobileOpen}
                  style={{width: drawerWidth}}
                  classes={{paper: classes.drawerPaper}}
                  onRequestClose={this.handleDrawerToggle}
                  ModalProps={{
                    keepMounted: true,
                  }}
                >
                  <div className={classes.drawerInner}>
                    <div className={classes.drawerHeader}>
                      <a className={classes.menuHeaderLink} href="#">
                        <Typography type="title" color="inherit" noWrap>
                          Api Plus
                          <em className={classes.version}>V0.21</em>
                        </Typography>
                      </a>
                      <a className={classes.menuHeaderLink} target="_blank" href="https://github.com/api-plus">
                        <Typography type="caption" color="inherit" noWrap>
                          Visit us on github
                        </Typography>
                      </a>
                    </div>
                    <Divider />
                    <ProjectList />
                  </div>
                </Drawer>
              </Hidden>
              {/* 大屏的menu */}
              <Hidden lgDown implementation="css">
                <Drawer
                  type="permanent"
                  open
                  style={{width: drawerWidth}}
                  classes={{paper: classes.drawerPaper}}
                >
                  <div className={classes.drawerInner}>
                    <div className={classes.drawerHeader}>
                      <a className={classes.menuHeaderLink} href="#">
                        <Typography type="title" color="inherit" noWrap>
                          Api Plus
                          <em className={classes.version}>V0.21</em>
                        </Typography>
                      </a>
                      <a className={classes.menuHeaderLink} target="_blank" href="https://github.com/api-plus">
                        <Typography type="caption" color="inherit" noWrap>
                          Visit us on github
                        </Typography>
                      </a>
                    </div>
                    <Divider />
                    <ProjectList />
                  </div>
                </Drawer>
              </Hidden>
              <main className={classes.content}>
                <AppRouter />
              </main>
            </div>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);
