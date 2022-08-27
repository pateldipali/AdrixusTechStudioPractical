import { ADD_FAVOURITE } from '../constants';
const initialState = {
    favouriteList: []
};
const favouriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAVOURITE:
            return {
                ...state,
                ...processAddFavouriteResponse(action)
            };
        default:
            return state;
    }
}

function processAddFavouriteResponse(action) {
    const { payload } = action
    console.log('action data---', payload)

    return {
        favouriteList: payload
    }
}

export default favouriteReducer;