import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import CardCustom from 'components/CardCustom/CardCustom';
import { useLocation } from 'hooks/router.hooks';
import PlanStatusIcon from 'components/icons/PlanStatusIcon/PlanStatusIcon';

const useStyles = makeStyles((theme) => ({
    listItem: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.grey[100],
        }
    }
}));

const warnList = [
    {text: '01.03.04 - Прикладная математика', isOk: false, status: 'warning'},
    {text:'02.03.03 - Математическое обеспечение и администрирование информационных систем', isOk: false, status: 'warning'},
    {text:'03.03.01 - Прикладные математика и физика', isOk: false, status: 'warning'},
    {text:'08.03.01 - Строительство', isOk: false, status: 'warning'},
    {text:'09.03.01 - Информатика и вычислительная техника', isOk: false, status: 'warning'},
    {text:'09.03.03 - Прикладная информатика', isOk: false, status: 'warning'},
    {text:'09.03.04 - Программная инженерия', isOk: false, status: 'warning'},
]

const errorList = [
    {text: '01.04.04 - Прикладная математика', isOk: false, status: 'error'},
    {text:'02.04.03 - Математическое обеспечение и администрирование информационных систем', isOk: false, status: 'error'},
    {text:'07.04.01 - Архитектура', isOk: false, status: 'error'},
    {text:'07.04.02 - Реконструкция и реставрация архитектурного наследия', isOk: false, status: 'error'},
    {text:'07.04.03 - Дизайн архитектурной среды', isOk: false, status: 'error'},
    {text:'07.04.04 - Градостроительство', isOk: false, status: 'error'},
    {text:'08.04.01 - Строительство', isOk: false, status: 'error'},
]

const HomePage: React.FC = () => {
    const classes = useStyles();
    const {navigate} = useLocation();
 
    return (
    <Box>
        <CardCustom title="Образовательные программы, требующие внимания">
            <CardContent>
                <List>
                    {warnList.map((item) => 
                    <ListItem
                        key={item.text}
                        dense
                        className={classes.listItem}
                        onClick={() => navigate('/criteries')}
                    >
                        <ListItemText primary={item.text}/>
                        <ListItemSecondaryAction>
                            <PlanStatusIcon plan={item}/>
                        </ListItemSecondaryAction>
                    </ListItem>)}
                </List>
            </CardContent>
        </CardCustom>
        <CardCustom title="Образовательные программы, не соответствующие критериям качества">
            <CardContent>
                <List>
                    {errorList.map((item) => 
                    <ListItem 
                        key={item.text}
                        dense
                        className={classes.listItem}
                        onClick={() => navigate('/criteries')}
                    >
                        <ListItemText primary={item.text}/>
                        <ListItemSecondaryAction>
                            <PlanStatusIcon plan={item}/>
                        </ListItemSecondaryAction>
                    </ListItem>)}
                </List>
            </CardContent>
        </CardCustom>
    </Box>
    );
}

export default HomePage;