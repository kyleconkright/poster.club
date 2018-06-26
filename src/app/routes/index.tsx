import * as React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import Home from './Home';

export default () => (
    <BrowserRouter>
        <main>
            <Switch>
                <Route path="/" exact render={(props: any) => <Home {...props} />} />
                <Route path="/:id" exact render={(props: any) => <Home {...props} />} />
            </Switch>
        </main>
    </BrowserRouter>
);
