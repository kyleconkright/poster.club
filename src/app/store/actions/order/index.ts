import { ActionResponse } from "../action";

export const SET_CUSTOMER_NAME = '[ORDER] Set Customer Name';
export const SET_CUSTOMER_ADDRESS = '[ORDER] Set Customer ADDRESS';

export type SetCustomerNameActionType = (name: string) => ActionResponse<string | null>;
export type SetCustomerAddressActionType = (address: object) => ActionResponse<object | null>;

export const setCustomerName = (name: string): Object => {
    return {
        type: SET_CUSTOMER_NAME,
        payload: name
    };
};

export const setCustomerAddress = (address: object): Object => {
    return {
        type: SET_CUSTOMER_ADDRESS,
        payload: address
    };
};