import * as React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './../checkout-form';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Address } from 'Infrastructure/models/address';

interface BillingProps {
    order: object | any,
    address: Address
}

interface BillingState {}

class Billing extends React.Component<BillingProps, BillingState> {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section id="billing">
                <header>
                    <h1>Payment Info</h1>
                </header>

                <div>
                    <p className="text-bold">Shipping Address</p>
                    <p>{this.props.order.customerName}</p>
                    <p>{this.props.address.address1}</p>
                    {this.props.address.address2 ? <p>{this.props.address.address2}</p> : null }
                    <p>{this.props.address.city}, {this.props.address.state} {this.props.address.zip}</p>
                    <p></p>
                </div>

                <StripeProvider apiKey="pk_test_LwL4RUtinpP3PXzYirX2jNfR">
                    <div>
                        <Elements>
                            <CheckoutForm />
                        </Elements>
                    </div>
                </StripeProvider>

            </section>
        )
    }
}

const mapPropsToState = (state) => {
    return {
        order: state.order,
        address: state.order.address
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({}, dispatch)
}

export default connect(mapPropsToState, mapDispatchToProps)(Billing);