import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

interface HomeProps {
    title: string;
    match: any;
}

interface HomeState {
    title: any;
}

class Home extends React.Component<HomeProps, HomeState> {

    constructor(props: HomeProps) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <section id="home">
               <h1>{ this.props.match.params.id ? this.props.match.params.id : 'hello'}</h1>
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
    return bindActionCreators({}, dispatch)
}

export default connect(mapPropsToState, mapDispatchToProps)(Home);