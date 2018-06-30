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
        axios.get('http://localhost:3000').then((res: any) => {
            this.props.setTitle(res.data[0].thumbnail)
        });
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <section id="home">
               <h1><img src={ this.props.title } /></h1>
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