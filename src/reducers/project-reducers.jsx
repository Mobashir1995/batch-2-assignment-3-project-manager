export function ProjectReducer( items, action ) {
    switch ( action.type ) {
        case "insert":
            return [...items, action.payload];
        case "update":
            return items.map( item => item.id === action.payload.id ? action.payload : item );
        case "delete":
            return items.filter( item => item.id!== action.payload );
        default:
            return items;
    }
}

export function modalBoxReducer( data, action ) {
    switch ( action.type ) {
        case "open":
        case "updating":
            const payload = action.payload;
            return {open: true, isNew: payload.isNew, editedItem: payload.item};
        case "close":
            return {open: false, isNew: true, editedItem: {}};
        default:
            return data;
    }
}

export function searchBoxReducer( data, action ) {
    switch ( action.type ) {
        case "search":
            return action.payload;
        default:
            return data;
    }
}