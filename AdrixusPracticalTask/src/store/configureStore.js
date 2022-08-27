import { createStore, combineReducers } from 'redux';
import favouriteReducer from '../reducers/Favourite.Reducer';
const rootReducer = combineReducers(
    { favouriteList: favouriteReducer }
);
const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;