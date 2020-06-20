import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface CardCustomProps {
    title: string;
}

const useStyles = makeStyles((theme) => ({
    customCard: {
        margin: 20,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

const CardCustom: React.FC<CardCustomProps> = ({title, ...props}) => {
    const [expanded, setExpanded] = React.useState(true);

    const classes = useStyles();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
 
    return (
        <Card className={classes.customCard}>
            <CardHeader
                action={
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
                }
                title={title}
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {props.children}
            </Collapse>
        </Card>
    );
}

export default CardCustom;