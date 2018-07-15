import { SET_CUSTOMER_NAME } from './../../actions/order';

export const INITIAL_STATE = {
    customerName: ''
};

export function OrderReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_CUSTOMER_NAME:
            return state;
        default:
            return state;
    }
}