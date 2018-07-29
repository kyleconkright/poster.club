import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomerAddress from './customer-address';

import * as orderActions from '../../store/actions/order';

interface CustomerInfoProps {
    customerName: string,
    setCustomerName: orderActions.SetCustomerNameActionType;
}

interface CustomerInfoState {
    customerName: string;
}

class CustomerInfo extends React.Component<CustomerInfoProps, CustomerInfoState>  {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.setCustomerName(event.target.value);
    }

    render() {
        return (
            <div className="flex-form">
                <div>
                    <label>Who are we shipping this to?</label>
                    <input className="input-med" onChange={this.handleChange} name="customer-name" type="customer-name" placeholder="Bobby Pin" />
                </div>
                <CustomerAddress />
            </div>
        )
    }
}

const mapPropsToState = (state) => {
    return {
        customerName: state.order.customerName
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        setCustomerName: orderActions.setCustomerName
    }, dispatch)
}

export default connect(mapPropsToState, mapDispatchToProps)(CustomerInfo);