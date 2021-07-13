import React from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SubjectIcon from '@material-ui/icons/Subject';
import {useHistory} from 'react-router-dom';
import {getUser} from '../Redux/StoreData';
import {useSelector} from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import {pink, grey} from '@material-ui/core/colors';
const drawerWidth = 240;
const useStyles = makeStyles (theme => ({
  root: {
    display: 'flex',
  },
  pink: {
    color: theme.palette.getContrastText (grey[100]),
    backgroundColor: grey[100],
  },
  appBar: {
    color: theme.palette.getContrastText (pink[500]),
    backgroundColor: pink[300],
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create (['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create (['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create ('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create ('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing (7) + 1,
    [theme.breakpoints.up ('sm')]: {
      width: theme.spacing (9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing (0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing (3),
  },
}));

export default function MiniDrawer({children}) {
  const classes = useStyles ();
  const theme = useTheme ();
  const [open, setOpen] = React.useState (false);
  const history = useHistory ();
  const user = useSelector (getUser);

  const handleDrawerOpen = () => {
    setOpen (true);
  };

  const handleDrawerClose = () => {
    setOpen (false);
  };

  const onProjectsClick = () => {
    history.push ('/projects');
  };
  const onLogInClick = () => {
    history.push ('/signIn');
  };
  return (
    <div className={classes.root}>
      {user &&
        <div>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx (classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx (classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <MenuIcon />
              </IconButton>
              <div className="w-100 d-flex justify-content-between align-items-center">
                <Typography variant="h6" noWrap>
                  Task Manager
                </Typography>
                {user
                  ? <Avatar className={classes.pink + ' border'}>
                      {user.username[0].toUpperCase ()}
                    </Avatar>
                  : <Avatar className={classes.pink + ' border'}>
                      A
                    </Avatar>}

              </div>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={clsx (classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx ({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl'
                  ? <ChevronRightIcon />
                  : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem button onClick={onProjectsClick}>
                <ListItemIcon>
                  <SubjectIcon />
                </ListItemIcon>
                <ListItemText primary={'Projects'} />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button onClick={onLogInClick}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary={'Log out'} />
              </ListItem>
            </List>

          </Drawer>
        </div>}

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
