import * as React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Script from 'react-load-script';
import Autocomplete from 'react-google-autocomplete';

import * as orderActions from '../../store/actions/order';
import { project } from './../../../../../config';
import axios from 'axios';

interface CustomerAddressProps {
    address: any,
    order: any,
    history: History | any,
    fetchOrderQuote: orderActions.FetchOrderQuoteActionType,
    setCustomerAddress: orderActions.SetCustomerAddressActionType,
    resetCustomerAddress: orderActions.SetCustomerAddressActionType,
    setCustomerAddressLoaded: orderActions.SetCustomerAddressLoadedActionType,
}

interface CustomerAddressState {
    addressInput: JSX.Element,
}

class CustomerAddress extends React.Component<CustomerAddressProps, CustomerAddressState>  {

    constructor(props) {
        super(props)
        this.handleScriptLoad = this.handleScriptLoad.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateAddress = this.validateAddress.bind(this);
        this.loading = this.loading.bind(this);

        this.state = {
            addressInput: <input /> as JSX.Element
        }

        console.log(this.props);
    }

    addressStyle = { width: '100%', border: 'none',  borderBottom: '1px solid #ccc', fontSize: '1.75rem' }

    handleScriptLoad() {
        this.setState({addressInput: <Autocomplete
            style={this.addressStyle}
            placeholder="123 Maple Ave, Anytown, ST"
            onPlaceSelected={(place) => {
                this.handleSave(place.adr_address);
            }}
            onChange={(place) => {
                if (!place.target.value) {
                    this.props.resetCustomerAddress({loaded: true, loading: true});
                }
            }}
            types={['address']}
            componentRestrictions={{ country: "us" }}
            
        />})
    }

    handleSave(address) {
        const el = document.createElement('html');
        el.innerHTML = address;
        const address1 = el.getElementsByClassName('street-address')[0];
        const address2 = (document.getElementsByClassName('address2')[0] as HTMLInputElement);
        const city = el.getElementsByClassName('locality')[0];
        const state = el.getElementsByClassName('region')[0];
        const zip = el.getElementsByClassName('postal-code')[0];
        this.props.setCustomerAddress({address1: address1.textContent, address2: address2.value, city: city.textContent, state: state.textContent, zip: zip.textContent});
    }

    handleChange(e) {
        this.props.setCustomerAddress({address2: e.target.value})
    }
    
    validateAddress() {
        this.props.fetchOrderQuote();
        axios.post(`${process.env.API_ROOT}/products/MkusRDmu77wwfdtxdDw9/quote`, {name: this.props.order.customerName, ...this.props.address})
            .then(res => this.props.history.push('./billing'))
            .catch(err => console.log(err))
    }

    loading() {
        return this.props.order.loading ? 'loading' : null;
    }

    render() {
        return (
            <div>
                <Script url={`https://maps.googleapis.com/maps/api/js?key=${project.googleMapsKey}&libraries=places`}
                    onLoad={this.handleScriptLoad}
                />
                <label>Where would you like it shipped?</label>
                {this.state.addressInput}
                <input name="suite" onChange={this.handleChange} className={`address2 input-med`} placeholder="suite (optional)" />
                { this.props.address.loaded }
                <button
                    className={this.loading()}
                    disabled={!this.props.address.loaded || this.props.order.customerName === ''}
                    onClick={this.validateAddress}>{this.props.order.loading ? 'Verifying...': 'Validate Address'}
                </button>
            </div>
        )
    }
}

const mapPropsToState = (state) => {
    return {
        address: state.order.address,
        order: state.order
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        fetchOrderQuote: orderActions.fetchOrderQuote,
        setCustomerAddress: orderActions.setCustomerAddress,
        resetCustomerAddress: orderActions.resetCustomerAddress,
        setCustomerAddressLoaded: orderActions.setCustomerAddressLoaded
    }, dispatch)
}

export default withRouter(connect(mapPropsToState, mapDispatchToProps)(CustomerAddress));