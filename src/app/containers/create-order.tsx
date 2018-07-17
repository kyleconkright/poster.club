import * as React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './checkout-form';
import CustomerInfo from './order/customer-info';
import CustomerAddress from './order/customer-address';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface CreateOrderProps {
    customerName: string,
    address: object
}

interface CreateOrderState {}

class CreateOrder extends React.Component<CreateOrderProps, CreateOrderState> {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section id="create-account">
                <header>
                    <h1>Place your order</h1>
                </header>

                <div className="content">
                    {this.props.customerName === '' ? <CustomerInfo /> : null}
                    {this.props.customerName !== '' ? <CustomerAddress /> : null}
                </div>

                {/* <StripeProvider apiKey="pk_test_LwL4RUtinpP3PXzYirX2jNfR">
                    <div className="example">
                        <h1>React Stripe Elements Example</h1>
                        <Elements>
                            <CheckoutForm />
                        </Elements>
                    </div>
                </StripeProvider>

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

const mapPropsToState = (state) => {
    return {
        customerName: state.order.customerName,
        address: state.order.address
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({}, dispatch)
}

export default connect(mapPropsToState, mapDispatchToProps)(CreateOrder);