import React from 'react';
import {Route, Switch} from 'react-router-dom';
import HomePage from 'pages/HomePage/HomePage';

const Pages: React.FC = () => {

    return (
    <Switch>
        <Route exact path="/" component={HomePage} />
    </Switch>
    );
}

export default Pages