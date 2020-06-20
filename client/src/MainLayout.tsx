import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Loading from 'components/Loading/Loading';
import Drawer from '@material-ui/core/Drawer';
import SideNav from 'components/navigation/SideNav/SideNav';
import AppTopBar from 'components/navigation/AppTopBar/AppTopBar';
import Pages from 'routing/Pages';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
		width: drawerWidth,
		flexShrink: 0,
    },
    drawerPaper: {
      	width: drawerWidth,
    },
    drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-start',
    },
    content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginRight: 0,
	  },
  }));

const MainLayout: React.FC = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <React.Suspense fallback={<Loading />}>
            <AppTopBar handleDrawerOpen={handleDrawerOpen} open={open}/>
            <main className={clsx(classes.content, {
				[classes.contentShift]: open,
			})}>
                <Pages/>
            </main>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
				<SideNav onClose={handleDrawerClose} />
            </Drawer>
        </React.Suspense>
    );
}

export default MainLayout