
export function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}
export function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}
export function itemsFetchDataSuccess(items) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}

export function errorAfterFiveSeconds() {
    // We return a function instead of an action object
    return (dispatch) => {
        setTimeout(() => {
            // This function is able to dispatch other action creators
            dispatch(itemsHasErrored(true));
        }, 5000);
    };
}

export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(itemsFetchDataSuccess(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}


function osmIsLoading(bool) {
    return {
        type: 'OSM_IS_LOADING',
        isLoading: bool
    };
}

export function osmHasErrored(bool) {
    return {
        type: 'OSM_HAS_ERRORED',
        hasErrored: bool
    };
}

export function osmFetchDataSuccess(element) {
    return {
        type: 'OSM_FETCH_DATA_SUCCESS',
        element
    };
}



export function fetchOsmElement(id) {
    const type = {w: 'way', n: 'node', r: 'relation'}[id[0]];
    const idx = id.substr(1);
    const url = `https://www.openstreetmap.org/api/0.6/${type}/${idx}`;

    return (dispatch) => {
        dispatch(osmIsLoading(true));
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(osmIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((element) => dispatch(osmFetchDataSuccess(element)))
            .catch(() => dispatch(osmHasErrored(true)));
    };
}


