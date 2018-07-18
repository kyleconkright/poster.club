import * as orderActions from './../../actions/order';

export const INITIAL_STATE = {
    customerName: '',
    address: {
        loaded: false,
        loading: false
    },
    loading: false,
    loaded: false
};

export function OrderReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case orderActions.SET_CUSTOMER_NAME:
            return {
                ...state,
                customerName: action.payload,
                loaded: true
            };
        case orderActions.SET_CUSTOMER_ADDRESS:
            return {
                ...state,
                address: {
                    ...state.address,
                    ...action.payload,
                    loaded: true
                },
                loaded: true
            };
        case orderActions.SET_CUSTOMER_ADDRESS_LOADED:
            return {
                ...state,
                address: {
                    ...state.address,
                    ...action.payload,
                    loaded: true
                },
                loaded: true
            };
        default:
            return state;
    }
}