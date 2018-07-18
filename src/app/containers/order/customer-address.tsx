import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Script from 'react-load-script';
import Autocomplete from 'react-google-autocomplete';

import * as orderActions from './../../store/actions/order';
import { project } from './../../../../config';
import axios from 'axios';

interface CustomerAddressProps {
    address: any,
    customerName: string,
    setCustomerAddress: orderActions.SetCustomerAddressActionType,
    setCustomerAddressLoaded: orderActions.SetCustomerAddressLoadedActionType,
}

interface CustomerAddressState {
    addressInput: JSX.Element,
    address: string
}

class CustomerAddress extends React.Component<CustomerAddressProps, CustomerAddressState>  {

    constructor(props) {
        super(props)
        this.handleScriptLoad = this.handleScriptLoad.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.state = {
            address: '',
            addressInput: <input /> as JSX.Element
        }
    }

    addressStyle = { width: '100%', border: 'none',  borderBottom: '1px solid #ccc', fontSize: '2rem' }

    handleScriptLoad() {
        this.setState({addressInput: <Autocomplete
            style={this.addressStyle}
            onPlaceSelected={(place) => {
                this.setState({address: place.adr_address})
                this.props.setCustomerAddressLoaded(true);
            }}
            types={['address']}
            componentRestrictions={{ country: "us" }}
            
        />})
    }

    handleSave() {
        const el = document.createElement('html');
        el.innerHTML = this.state.address;
        const street1 = el.getElementsByClassName('street-address')[0];
        const city = el.getElementsByClassName('locality')[0];
        const state = el.getElementsByClassName('region')[0];
        const postalCode = el.getElementsByClassName('postal-code')[0];
        const address = {street1: street1.textContent, city: city.textContent, state: state.textContent, postalCode: postalCode.textContent};
        console.log(address);
        axios.post('http://localhost:3000/products/MkusRDmu77wwfdtxdDw9/quote', address)
        this.props.setCustomerAddress(address);
    }

    render() {
        return (
            <div className="flex-form">
                <input className="input-large no-border" disabled type="text" value={this.props.customerName}/>
                <Script url={`https://maps.googleapis.com/maps/api/js?key=${project.googleMapsKey}&libraries=places`}
                    onLoad={this.handleScriptLoad}
                />
                <label>Where would you like it shipped?</label>
                {this.state.addressInput}
                { this.props.address.loaded ? <input name="suite" className="input-large" placeholder="suite (optional)" /> : null}
                { this.props.address.loaded ? <button onClick={this.handleSave}>Validate Address</button> : null }
            </div>
        )
    }
}

const mapPropsToState = (state) => {
    return {
        address: state.order.address,
        customerName: state.order.customerName
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        setCustomerAddress: orderActions.setCustomerAddress,
        setCustomerAddressLoaded: orderActions.setCustomerAddressLoaded
    }, dispatch)
}

export default connect(mapPropsToState, mapDispatchToProps)(CustomerAddress);