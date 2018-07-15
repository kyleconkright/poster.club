import { ActionResponse } from "../action";

export const SET_CUSTOMER_NAME = '[ORDER] Set Customer Name';

export type SetCustomerNameActionType = (name: string) => ActionResponse<string | null>;

export const setCustomerName = (name: string): Object => {
    return {
        type: SET_CUSTOMER_NAME,
        payload: name
    };
};