import * as React from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './checkout-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface CreateAccountProps {

}

interface CreateAccountState { }

class CreateAccountComponent extends React.Component<CreateAccountProps, CreateAccountState> {
    render() {
        return (
            <section id="create-account">
                <header>
                    <h1>Get Started</h1>
                </header>

                <StripeProvider apiKey="pk_test_LwL4RUtinpP3PXzYirX2jNfR">
                    <div className="example">
                        <h1>React Stripe Elements Example</h1>
                        <Elements>
                            <CheckoutForm />
                        </Elements>
                    </div>
                </StripeProvider>
                {/* <div className="content">
                    <form className="flex-form">
                        <input type="text" placeholder="name@email.com" />
                        <input type="text" placeholder="•••••••••" />
                        <input type="text" placeholder="•••••••••" />
                        <button>Create Account</button>
                    </form>
                </div> */}
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