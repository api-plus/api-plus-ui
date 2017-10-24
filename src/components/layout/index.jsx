import React from 'react';
import { Provider } from 'mobx-react';
import createHistory from 'history/createHashHistory';
const history = new createHistory();

import AppBar from 'material-ui/AppBar';
import blue from 'material-ui/colors/blue';
import Divider from 'material-ui/Divider';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { createMuiTheme, MuiThemeProvider, withStyles } from 'material-ui/styles';

import store from '../../models';
import AppRouter from '../app-router';
import AppToolBar from '../toolbar';
import ProjectList from '../../pages/ProjectList';

// import './index.less';

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
  layoutContainer: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100vh',
    width: '100%',
  },
  layoutHeader: {
    transition: theme.transitions.create('width'),
    '@media print': {
      position: 'absolute',
    },
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - 250px)',
    },
  },
  layoutNavContainer: {
    [theme.breakpoints.up('lg')]: {
      width: 250,
    },
    [theme.breakpoints.down('lg')]: {
      display: 'none'
    },
    flex: '0 0 auto',
  },
  layoutNav: {
    backgroundColor: '#fff',
    width: 250,
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    flex: '1 0 auto',
    position: 'fixed',
    top: 0,
    zIndex: theme.zIndex.navDrawer,
    willChange: 'transform',
    '&:focus': {
      outline: 'none',
    },
    WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
  },
  logoContainer: {
    display: 'flex',
  },
  logo: {
    padding: '0 16px',
    backgroundColor: '#fff',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.primary[500],
    },
  },
  caption: {
    color: theme.palette.text.secondary,
  },
  navList: {
    paddingTop: '8px',
    paddingBottom: '8px',
    flex: '1 1 auto',
    margin: '0',
    padding: '0',
    position: 'relative',
    listStyle: 'none',
  },
  layoutContentContaine: {
    margin: '80px 24px 100px'
  }
});

class Layout extends React.Component {
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
          <div className={classes.layoutContainer}>
            <AppBar className={classes.layoutHeader}>
              <AppToolBar />
            </AppBar>
            <nav className={classes.layoutNavContainer}>
              <div className={classes.layoutNav}>
                <div>
                  <div className={classes.logoContainer}>
                    <Toolbar className={classes.logo}>
                      <Typography className={classes.title} type="title" gutterBottom color="inherit">
                        Api Plus
                      </Typography>
                      <Typography className={classes.caption} type="caption">
                        Api Document Manager
                      </Typography>
                      <Divider absolute />
                    </Toolbar>
                  </div>
                  <div className={classes.navList}>
                    <ProjectList />
                  </div>
                </div>
              </div>
            </nav>
            <div className={classes.layoutContentContaine}r>
              <AppRouter />
            </div>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default withStyles(styles)(Layout);