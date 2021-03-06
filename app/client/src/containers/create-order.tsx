import * as React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './checkout-form';
import CustomerInfo from './order/customer-info';

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
                    <CustomerInfo />
                </div>
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