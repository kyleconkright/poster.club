import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import axios from 'axios';
import { setTitle } from './../store/actions';

interface HomeProps {
    title: string;
    match: any;
    setTitle: any;
}

interface HomeState {
    title: any;
}

class Home extends React.Component<HomeProps, HomeState> {

    constructor(props: HomeProps) {
        super(props);
    }

    private getData() {
        axios.get('http://localhost:3000/products').then((res: any) => {
            this.props.setTitle(res.data[0].title)
        });
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <section id="home">
                <p>Keep your walls fresh with plans starting as low as $15 a month</p>
                <button>Get Started</button>
            </section>
        )
    }
}

const mapPropsToState = (state: HomeState) => {
    return {
        title: state.title,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        setTitle: setTitle
    }, dispatch)
}

export default connect(mapPropsToState, mapDispatchToProps)(Home);