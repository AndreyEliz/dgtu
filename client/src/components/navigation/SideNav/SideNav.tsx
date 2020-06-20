import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { useLocation } from 'hooks/router.hooks';

interface SideNavProps {
    onClose(): void;
}

const useStyles = makeStyles((theme) => ({
    drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-start',
    },
}));

const navItems = [
    {
        text: 'Учебные планы',
        link: 'study-plans'
    },
    {
        text: 'Добавить программу',
        link: 'study-plans'
    },
]

const SideNav: React.FC<SideNavProps> = ({onClose}) => {
    const classes = useStyles();
    const theme = useTheme();
    const {location, navigate} = useLocation();

    return (
    <>
        <div className={classes.drawerHeader}>
            <IconButton onClick={onClose}>
                {theme.direction !== 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
        </div>
        <Divider />
        <List>
            {navItems.map((item) => (
                <ListItem button key={item.text} onClick={() => navigate(item.link)}>
                    <ListItemText primary={item.text} />
                </ListItem>
            ))}
        </List>
    </>
    );
}

export default SideNav