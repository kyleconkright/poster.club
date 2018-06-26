const initialState = {
    title: 'Poster Boys',
}

const reducer = (state = initialState, action: any) => {
    switch(action.type) {
        case 'SET_TITLE': {
            return {
                ...state,
            }
        }
    }
    return state;
}

export default reducer;
