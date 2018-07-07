import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface CreateAccountProps {

}

interface CreateAccountState {}

class CreateAccountComponent extends React.Component<CreateAccountProps, CreateAccountState> {
    render() {
        return (
            <section id="create-account">
                <header>
                    <h1>Create Account</h1>
                </header>
                <div className="content">This is where you'll create your account</div>
            </section>
        )
    }
}

const mapPropsToState = (state: CreateAccountState) => {
    return {}
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({}, dispatch)
}

export default connect(mapPropsToState, mapDispatchToProps)(CreateAccountComponent);