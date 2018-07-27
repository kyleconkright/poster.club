export const SET_TITLE = '[TITLE] Set Title';

export const setTitle = (title: object): Object => {
    return {
        type: SET_TITLE,
        payload: title
    };
};