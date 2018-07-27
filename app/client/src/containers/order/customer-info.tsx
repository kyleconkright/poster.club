import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
        this.handleSave = this.handleSave.bind(this);
    }

    handleChange(event) {
        this.setState({customerName: event.target.value});
    }
    
    handleSave() {
        if(this.state && this.state.customerName) {
            this.props.setCustomerName(this.state.customerName);
        }
    }

    render() {
        return (
            <div className="flex-form">
                <label>Who are we shipping this to?</label>
                <input className="input-large" onChange={this.handleChange} onBlur={this.handleSave} name="customer-name" type="customer-name" placeholder="Bobby Pin" />
                {this.props.customerName === '' ? <button onClick={this.handleSave}>Next</button> : null}
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