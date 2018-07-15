import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as orderActions from './../../store/actions/order';

interface CustomerInfoProps {
    order: {},
    setCustomerName: orderActions.SetCustomerNameActionType;
}

interface CustomerInfoState {}

class CustomerInfo extends React.Component<CustomerInfoProps, CustomerInfoState>  {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log(event.target.value);
    }

    render() {
        return (
            <form className="flex-form">
                <label>Who are we shipping this to?</label>
                <input className="input-large" onChange={this.handleChange} name="customer-name" type="customer-name" placeholder="Bobby Pin" />
                <button>Next</button>
            </form>
        )
    }
}

const mapPropsToState = (state) => {
    order: state.order
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        setCustomerName: orderActions.setCustomerName
    }, dispatch)
}

export default connect(mapPropsToState, mapDispatchToProps)(CustomerInfo);