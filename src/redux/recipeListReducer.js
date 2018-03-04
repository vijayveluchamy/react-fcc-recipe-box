import recipeReducer from './recipeReducer';

//Recipe list reducer
const recipeListReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_RECIPE':
            return [
                ...state,
                recipeReducer(undefined, action)
            ];
        case 'UPDATE_RECIPE':
            return state.map(recipe => recipeReducer(recipe, action));
        case 'DELETE_RECIPE':
            return state.filter(recipe => recipe.id !== action.id);
        default:
            return state;

    }
}

export default recipeListReducer;