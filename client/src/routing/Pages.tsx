import React from 'react';
import {Route, Switch} from 'react-router-dom';
import HomePage from 'pages/HomePage/HomePage';
import StudyPlansPage from 'pages/StudyPlansPage/StudyPlansPage';

const Pages: React.FC = () => {

    return (
    <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/study-plans" component={StudyPlansPage} />
    </Switch>
    );
}

export default Pages