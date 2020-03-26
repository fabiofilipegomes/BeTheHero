import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import HomePage from './pages/home';
import AddIncidentPage from './pages/add-incident';

function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />

                <Route path="/" exact component={HomePage} />
                <Route path="/incidents/add" component={AddIncidentPage} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;