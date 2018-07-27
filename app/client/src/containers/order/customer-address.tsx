import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Script from 'react-load-script';
import Autocomplete from 'react-google-autocomplete';

import * as orderActions from '../../store/actions/order';
import { project } from './../../../../../config';
import axios from 'axios';

interface CustomerAddressProps {
    address: any,
    customerName: string,
    loading: boolean,
    loaded: boolean,
    fetchOrderQuote: orderActions.FetchOrderQuoteActionType,
    setCustomerAddress: orderActions.SetCustomerAddressActionType,
    setCustomerAddressLoaded: orderActions.SetCustomerAddressLoadedActionType,
}

interface CustomerAddressState {
    addressInput: JSX.Element,
    address: any,
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
            address: {},
            addressInput: <input /> as JSX.Element
        }
    }

    addressStyle = { width: '100%', border: 'none',  borderBottom: '1px solid #ccc', fontSize: '2rem' }

    handleScriptLoad() {
        this.setState({addressInput: <Autocomplete
            style={this.addressStyle}
            onPlaceSelected={(place) => {
                this.handleSave(place.adr_address);
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
        this.setState({address: {address1: address1.textContent, address2: address2.value, city: city.textContent, state: state.textContent, zip: zip.textContent}});
    }

    handleChange(e) {
        console.log(e.target.value);
        this.setState({address: {...this.state.address, address2: e.target.value}})
    }
    
    validateAddress() {
        this.props.fetchOrderQuote();
        axios.post('http://localhost:3000/products/MkusRDmu77wwfdtxdDw9/quote', {name: this.props.customerName, ...this.state.address}).then(res => {
            this.props.setCustomerAddress(this.state.address);
        })
    }

    loading() {
        return this.props.loading ? 'loading' : null;
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
                { this.state.address ? <input name="suite" onChange={this.handleChange} className={`address2 input-large`} placeholder="suite (optional)" /> : null}
                { this.state.address ? <button className={this.loading()} disabled={this.props.loading} onClick={this.validateAddress}>{this.props.loading ? 'Verifying...': 'Validate Address'}</button> : null }
            </div>
        )
    }
}

const mapPropsToState = (state) => {
    return {
        loading: state.order.loading,
        loaded: state.order.loaded,
        address: state.order.address,
        customerName: state.order.customerName
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        fetchOrderQuote: orderActions.fetchOrderQuote,
        setCustomerAddress: orderActions.setCustomerAddress,
        setCustomerAddressLoaded: orderActions.setCustomerAddressLoaded
    }, dispatch)
}

export default connect(mapPropsToState, mapDispatchToProps)(CustomerAddress);