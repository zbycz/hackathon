import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading } from './items';


const data = (state = { elements: {} }, action) => {
    if (action.type === 'OSM_FETCH_DATA_SUCCESS') {
        state.elements = action.element;
    }

    return state;
};


export default combineReducers({
    items,
    itemsHasErrored,
    itemsIsLoading,
    data
});
