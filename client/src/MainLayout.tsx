import React from 'react';
import {Route, Switch} from 'react-router-dom';
// import {useTheme} from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import HomePage from 'pages/HomePage/HomePage';
import {useStyles} from 'styles/styles';
import Loading from 'components/Loading/Loading';
const MainLayout: React.FC = () => {
    // const theme = useTheme();
    // const isNotMobile = useMediaQuery(theme.breakpoints.up('md'), {noSsr: true});
    const classes = useStyles();

    return (
        <React.Suspense fallback={<Loading />}>
            {/* {!isNotMobile && <MobileNavBar/>} */}
            <Container className={classes.layoutContainer}>
                {/* {isNotMobile && <NavigationBar />} */}
                <Switch>
                    <Route exact path="/" component={HomePage} />
                </Switch>
            </Container>
        </React.Suspense>
    );
}

export default MainLayout