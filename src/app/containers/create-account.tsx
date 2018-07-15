import * as React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './checkout-form';
import CustomerInfo from './order/customer-info';
import Autocomplete from 'react-google-autocomplete';
import Script from 'react-load-script'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface CreateAccountProps {

}

interface CreateAccountState {
    thing: JSX.Element
}

class CreateAccountComponent extends React.Component<CreateAccountProps, CreateAccountState> {

    constructor(props) {
        super(props)
        this.state = {
            thing: <input /> as JSX.Element
        }
    }

    handleScriptLoad() {
        this.setState({thing: <Autocomplete
            style={{ width: '100%', border: 'none' }}
            onPlaceSelected={(place) => {
                console.log(place);
            }}
            types={['address']}
            componentRestrictions={{ country: "us" }}
        />})
    }

    render() {
        return (
            <section id="create-account">
                <header>
                    <h1>Get Started</h1>
                </header>

                <CustomerInfo />

                {/* <StripeProvider apiKey="pk_test_LwL4RUtinpP3PXzYirX2jNfR">
                    <div className="example">
                        <h1>React Stripe Elements Example</h1>
                        <Elements>
                            <CheckoutForm />
                        </Elements>
                    </div>
                </StripeProvider>

                <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCxI0i25U1Yx1SE5fOjrvkG_Wh_rg4Mix0&libraries=places"
                    onLoad={this.handleScriptLoad.bind(this)}
                />
                { this.state.thing } */}

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