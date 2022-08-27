import { ADD_FAVOURITE } from '../constants';
export function addFavourites(data) {
    return {
        type: ADD_FAVOURITE,
        payload: data
    }
}