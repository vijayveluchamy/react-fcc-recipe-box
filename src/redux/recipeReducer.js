const recipeReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_RECIPE':
            return {
                id: action.id,
                name: action.name,
                ingredients: action.ingredients
            };
        case 'UPDATE_RECIPE':
            if (state.id === action.id) {
                return Object.assign({}, state, {
                    name: action.name,
                    ingredients: action.ingredients
                });
            } else {
                return state;
            }
        default:
            return state;
    };
}

export default recipeReducer;