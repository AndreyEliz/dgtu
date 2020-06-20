import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import { useLocation } from 'hooks/router.hooks';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

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
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const navItems = [
    {
        text: 'ОП, требующие внимания ',
        link: 'study-plans'
    },
    {
        text: 'Бакалавриат',
        link: 'study-plans',
        sub: [{
            text: 'Очная форма',
            link: 'study-plans'
        },
        {
            text: 'Очно-заочная форма',
            link: 'study-plans'
        },
        {
            text: 'Заочная форма',
            link: 'study-plans'
        }],
    },
    {
        text: 'Магистратура',
        link: 'study-plans',
        sub: [{
            text: 'Очная форма',
            link: 'study-plans'
        },
        {
            text: 'Очно-заочная форма',
            link: 'study-plans'
        },
        {
            text: 'Заочная форма',
            link: 'study-plans'
        }],
    },
    {
        text: 'Специалитет',
        link: 'study-plans',
        sub: [{
            text: 'Очная форма',
            link: 'study-plans'
        },
        {
            text: 'Очно-заочная форма',
            link: 'study-plans'
        },
        {
            text: 'Заочная форма',
            link: 'study-plans'
        }],
    },
    {
        text: 'Добавить программу',
        link: 'study-plans'
    },
]

const SideNav: React.FC<SideNavProps> = ({onClose}) => {
    const classes = useStyles();
    const theme = useTheme();
    const {navigate} = useLocation();

    const [openBac, setOpenBac] = React.useState(false);
    const [openMac, setOpenMac] = React.useState(false);
    const [openSpec, setOpenSpec] = React.useState(false);

    const expandBac = () => {
        setOpenBac(!openBac);
    };

    const expandMac = () => {
        setOpenMac(!openMac);
    };

    const expandSpec = () => {
        setOpenSpec(!openSpec);
    };

    return (
    <>
        <div className={classes.drawerHeader}>
            <IconButton onClick={onClose}>
                {theme.direction !== 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
        </div>
        <Divider />
        <List
            component="nav"
        >
            <ListItem button onClick={() => navigate('')}>
                <ListItemText primary="ОП, требующие внимания" />
            </ListItem>
            <ListItem button onClick={expandBac}>
                <ListItemText primary="Бакалавриат" />
                {openBac ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openBac} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} onClick={() => navigate('study-plans')}>
                        <ListItemText primary="Очная форма" />
                    </ListItem>
                    <ListItem button className={classes.nested} onClick={() => navigate('study-plans')}>
                        <ListItemText primary="Очно-заочная форма" />
                    </ListItem>
                    <ListItem button className={classes.nested} onClick={() => navigate('study-plans')}>
                        <ListItemText primary="Заочная форма" />
                    </ListItem>
                </List>
            </Collapse>
            <ListItem button onClick={expandMac}>
                <ListItemText primary="Магистратура" />
                {openMac ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openMac} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} onClick={() => navigate('study-plans')}>
                        <ListItemText primary="Очная форма" />
                    </ListItem>
                    <ListItem button className={classes.nested} onClick={() => navigate('study-plans')}>
                        <ListItemText primary="Очно-заочная форма" />
                    </ListItem>
                    <ListItem button className={classes.nested} onClick={() => navigate('study-plans')}>
                        <ListItemText primary="Заочная форма" />
                    </ListItem>
                </List>
            </Collapse>
            <ListItem button onClick={expandSpec} >
                <ListItemText primary="Специалитет"/>
                {openSpec ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openSpec} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} onClick={() => navigate('study-plans')}>
                        <ListItemText primary="Очная форма" />
                    </ListItem>
                    <ListItem button className={classes.nested} onClick={() => navigate('study-plans')}>
                        <ListItemText primary="Очно-заочная форма" />
                    </ListItem>
                    <ListItem button className={classes.nested} onClick={() => navigate('study-plans')}>
                        <ListItemText primary="Заочная форма" />
                    </ListItem>
                </List>
            </Collapse>
        </List>
    </>
    );
}

export default SideNav