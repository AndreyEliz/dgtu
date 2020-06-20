import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import CardCustom from 'components/CardCustom/CardCustom';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import WarningIcon from '@material-ui/icons/Warning';
import { useLocation } from 'hooks/router.hooks';

const useStyles = makeStyles((theme) => ({
    ok: {
        color: theme.palette.success.main,
    },
    warning: {
        color: theme.palette.error.main,
    },
    listItem: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.grey[100],
        }
    }
}));

const baclanList = [
    {text: '01.03.04 - Прикладная математика', isOk: true},
    {text:'02.03.03 - Математическое обеспечение и администрирование информационных систем', isOk: true},
    {text:'03.03.01 - Прикладные математика и физика', isOk: true},
    {text:'08.03.01 - Строительство', isOk: true},
    {text:'09.03.01 - Информатика и вычислительная техника', isOk: true},
    {text:'09.03.03 - Прикладная информатика', isOk: false},
    {text:'09.03.04 - Программная инженерия', isOk: true},
]

const magList = [
    {text: '01.04.04 - Прикладная математика', isOk: true},
    {text:'02.04.03 - Математическое обеспечение и администрирование информационных систем', isOk: true},
    {text:'07.04.01 - Архитектура', isOk: false},
    {text:'07.04.02 - Реконструкция и реставрация архитектурного наследия', isOk: true},
    {text:'07.04.03 - Дизайн архитектурной среды', isOk: true},
    {text:'07.04.04 - Градостроительство', isOk: true},
    {text:'08.04.01 - Строительство', isOk: true},
]

const StudyPlansPage: React.FC = () => {
    const classes = useStyles();
    const {navigate} = useLocation();
 
    return (
    <Box>
        <Typography>Учебные планы</Typography>
        <CardCustom title="Бакалавриат">
            <CardContent>
                <List>
                    {baclanList.map((item) => 
                    <ListItem
                        key={item.text}
                        dense
                        className={classes.listItem}
                        onClick={() => navigate('/criteries')}
                    >
                        <ListItemText primary={item.text}/>
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments">
                                {item.isOk ? <CheckCircleOutlineIcon  className={classes.ok}/> : <WarningIcon className={classes.warning}/>}
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>)}
                </List>
            </CardContent>
        </CardCustom>
        <CardCustom title="Магистратура">
            <CardContent>
                <List>
                    {magList.map((item) => 
                    <ListItem 
                        key={item.text}
                        dense
                        className={classes.listItem}
                        onClick={() => navigate('/criteries')}
                    >
                        <ListItemText primary={item.text}/>
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments">
                                {item.isOk ? <CheckCircleOutlineIcon  className={classes.ok}/> : <WarningIcon className={classes.warning}/>}
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>)}
                </List>
            </CardContent>
        </CardCustom>
    </Box>
    );
}

export default StudyPlansPage;