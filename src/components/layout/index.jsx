// 参考官方的框架布局 https://material-ui-next.com/demos/drawers/#persistent-drawer
import React from 'react';
import { Provider } from 'mobx-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AppBar, Button, Divider, Drawer, IconButton, List, Toolbar, Typography } from 'material-ui';
import { createMuiTheme, MuiThemeProvider, withStyles } from 'material-ui/styles';
import { ChevronLeft, ChevronRight, Menu } from 'material-ui-icons';
import blue from 'material-ui/colors/blue';

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
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  buttonContainer: {
    textAlign: 'center',
  },
  button: {
    width: '100%',
    margin: '8px 0',
    // lineHeight: '20px',
    // padding: '0px 16px',
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    height: '100%',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    marginLeft: -drawerWidth,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      content: {
        height: 'calc(100% - 64px)',
        marginTop: 64,
      },
    },
  },
  contentShift: {
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});

class Layout extends React.Component {
  state = {
    open: true,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
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
              <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
                <Toolbar disableGutters={!this.state.open}>
                  <IconButton
                    color="contrast"
                    aria-label="open drawer"
                    onClick={this.handleDrawerOpen}
                    className={classNames(classes.menuButton, this.state.open && classes.hide)}
                  >
                    <Menu />
                  </IconButton>
                  <Typography type="title" color="inherit" noWrap>
                    Api Plus
                  </Typography>
                </Toolbar>
              </AppBar>
              <Drawer
                type="persistent"
                style={{width: drawerWidth}}
                classes={{
                  paper: classes.drawerPaper,
                }}
                open={this.state.open}
              >
                <div className={classes.drawerInner}>
                  <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose}>
                      {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
                    </IconButton>
                  </div>
                  <Divider />
                  <div className={classes.buttonContainer}>
                    <Button dense href='#/create/project' className={classes.button}>新建项目</Button>
                  </div>
                  <Divider />
                  <ProjectList />
                </div>
              </Drawer>
              <main className={classNames(classes.content, this.state.open && classes.contentShift)}>
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
