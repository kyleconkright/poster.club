import { SET_TITLE } from './actions';

const initialState = {
    title: 'Poster Boys',
}

const reducer = (state = initialState, action: any) => {
    switch(action.type) {
        case SET_TITLE: {
            return {
                ...state,
                title: action.payload
            }
        }
    }   
    return state;
}

export default reducer;
