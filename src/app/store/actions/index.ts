export const SET_TITLE = '[TITLE] Set Title';

export const setTitle = (title: object) => {
    return {
        type: SET_TITLE,
        payload: title
    };
};