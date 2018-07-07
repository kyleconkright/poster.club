import * as React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import Home from './Home';
import CreateAccountComponent from './../containers/create-account';

export default () => (
    <BrowserRouter>
        <div id="app">
            <aside>
                <header>
                    <h1><Link to={'/'}>freshwall</Link></h1>
                </header>
            </aside>
            <main>
                <Switch>
                    <Route path="/" exact render={(props: any) => <Home {...props} />} />
                    <Route path="/account/create" exact render={(props: any) => <CreateAccountComponent {...props} />} />
                </Switch>
            </main>
        </div>
    </BrowserRouter>
);
