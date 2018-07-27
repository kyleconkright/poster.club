import * as React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import Home from './Home';
import CreateOrder from '../containers/create-order';

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
                    <Route path="/order/create" exact render={(props: any) => <CreateOrder {...props} />} />
                </Switch>
            </main>
        </div>
    </BrowserRouter>
);
