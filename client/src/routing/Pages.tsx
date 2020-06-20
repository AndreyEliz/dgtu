import React from 'react';
import {Route, Switch} from 'react-router-dom';
import HomePage from 'pages/HomePage/HomePage';
import StudyPlansPage from 'pages/StudyPlansPage/StudyPlansPage';
import ChartsPage from '../pages/ChartsPage/ChartsPage';
import CriteriesPage from 'pages/CriteriesPage/CriteriesPage';

const Pages: React.FC = () => {

    return (
    <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/study-plans" component={StudyPlansPage} />
        <Route exact path="/charts" component={ChartsPage} />
        <Route exact path="/criteries" component={CriteriesPage} />
    </Switch>
    );
}

export default Pages