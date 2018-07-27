import * as React from 'react';
import axios from 'axios';
import { CardElement, injectStripe } from 'react-stripe-elements';

interface CheckoutFormProps {
    stripe: any
}
interface CheckoutFormState {
    complete: boolean,
}

class CheckoutForm extends React.Component<CheckoutFormProps, CheckoutFormState> {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {complete: false};
        this.submit = this.submit.bind(this);
    }

    async submit(ev) {
        let { token } = await this.props.stripe.createToken({ name: 'Name' });
        console.log(token);
        let response = await axios({
            method: 'POST',
            url: 'http://localhost:3000/charge',
            data: {
                headers: { 'Content-Type': 'application/json' },
                body: token.id
            }
        });

        if (response.status) this.setState({complete: true});
    }

    render() {
        if (this.state.complete) return <h1>Purchase Complete</h1>;

        return (
            <div className="checkout">
                <p>Would you like to complete the purchase?</p>
                <CardElement />
                <button onClick={this.submit}>Send</button>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);