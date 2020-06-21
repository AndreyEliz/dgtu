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
    defaultOpen?: boolean;
    className?: any;
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
    header: {
        fontSize: '1.2rem',
    }
}));

const CardCustom: React.FC<CardCustomProps> = ({title, className, defaultOpen=true, ...props}) => {
    const [expanded, setExpanded] = React.useState(defaultOpen);

    const classes = useStyles();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const wrapperClass = clsx(classes.customCard, className)
 
    return (
        <Card className={wrapperClass}>
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
                title={<span className={classes.header}>{title}</span>}
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {props.children}
            </Collapse>
        </Card>
    );
}

export default CardCustom;