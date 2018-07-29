import * as React from 'react';
import { Component } from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Home from './Home';
import CreateOrder from '../containers/create-order';
import Billing from '../containers/billing/billing';

interface RoutesProps {
    address: any;
}

interface RoutesState {}

class Routes extends React.Component<RoutesProps, RoutesState> {
    render() {
        return (
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
                        <Route path="/order/billing" exact render={(props: any) => this.props.address.loaded ?  <Billing {...props} /> : <Redirect to='/'/>} />
                        <Route render={() => <Redirect to='/'/> } />
                    </Switch>
                </main>
            </div>
        </BrowserRouter>
        )
    }
};

const mapPropsToState = (state) => {
    return {
        order: state.order,
        address: state.order.address
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({}, dispatch)
}

export default connect(mapPropsToState, mapDispatchToProps)(Routes);