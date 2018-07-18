import { ActionResponse } from "../action";

export const SET_CUSTOMER_NAME = '[ORDER] Set Customer Name';
export const SET_CUSTOMER_ADDRESS = '[ORDER] Set Customer Address';
export const SET_CUSTOMER_ADDRESS_LOADED = '[ORDER] Load Customer Google Address';

export type SetCustomerNameActionType = (name: string) => ActionResponse<string | null>;
export type SetCustomerAddressActionType = (address: object) => ActionResponse<object | null>;
export type SetCustomerAddressLoadedActionType = (loaded: boolean) => ActionResponse<boolean | null>;

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

export const setCustomerAddressLoaded = (loaded: boolean): Object => {
    return {
        type: SET_CUSTOMER_ADDRESS,
        payload: loaded
    };
};