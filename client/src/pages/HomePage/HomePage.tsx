import React from 'react';
import Box from '@material-ui/core/Box';

import { useStyles } from './styles';
import { useSelector } from 'react-redux';

const HomePage: React.FC = () => {

    const userName = useSelector((state:any) => state.authentication.get('userName'))
    const classes = useStyles();
 
    return (
    <>
        <Box className={classes.greating}>
            test
            {userName}
        </Box>
    </>
    );
}

export default HomePage;