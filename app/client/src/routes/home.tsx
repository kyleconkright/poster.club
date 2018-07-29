import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { setTitle } from './../store/actions';

interface HomeProps {}

interface HomeState {}

class Home extends React.Component<HomeProps, HomeState> {

    constructor(props: HomeProps) {
        super(props);        
    }

    render() {
        return (
            <section id="home">
                <header>
                </header>
                <div className="content">
                    <p>Keep your walls fresh with plans starting as low as $15 a month</p>
                    <Link className="button" to={'order/create'}>Get Started</Link>
                </div>
            </section>
        )
    }
}

const mapPropsToState = (state: HomeState) => {
    return {}
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        setTitle: setTitle
    }, dispatch)
}

export default connect(mapPropsToState, mapDispatchToProps)(Home);