import React from 'react';
import clsx from 'clsx';
import {Route, Switch} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import HomePage from 'pages/HomePage/HomePage';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Loading from 'components/Loading/Loading';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import SideNav from 'components/navigation/SideNav/SideNav';

const drawerWidth = 240;

interface AppTopBarProps {
    handleDrawerOpen(): void;
    open: boolean;
}

const useStyles = makeStyles((theme) => ({
    appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
    },
    appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: drawerWidth,
    },
    title: {
      	flexGrow: 1,
    },
    hide: {
      	display: 'none',
    },
  }));

const AppTopBar: React.FC<AppTopBarProps> = ({handleDrawerOpen, open}) => {
    const classes = useStyles();

    return (
    <>
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {[classes.appBarShift]: open,})}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerOpen}
                    className={clsx(open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap className={classes.title}>
                    DGTU
                </Typography>
            </Toolbar>
        </AppBar>
    </>
    );
}

export default AppTopBar