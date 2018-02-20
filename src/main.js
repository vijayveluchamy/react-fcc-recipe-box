import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Redux, { createStore } from 'redux';

//const { Component } = React;
//const { createStore } = Redux;

/** Reducers */

//Recipe Reducer
const recipeReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_RECIPE':
            return {
                id: action.id,
                name: action.name,
                ingredients: action.ingredients
            };
        case 'EDIT_RECIPE':
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
            return [
                ...state.slice(0, action.id),
                ...state.slice(action.id + 1)
            ];
        default:
            return state;

    }
}

// Create store from reducer
const store = createStore(recipeListReducer);



/** UI Elements */
let recipeIdx = 0;
class AddRecipeContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let recipeNameTxt;
        let ingredientsTxt;

        return (

            <div id='add-recipe-container'>
                <div>
                    <label>Name:</label>
                    <input
                        ref={node => {
                            recipeNameTxt = node
                        }}
                    />
                </div>
                <div>
                    <label>Ingredients:</label>
                    <textarea
                        ref={node => {
                            ingredientsTxt = node;
                        }} />
                </div>
                <div>
                    <button
                        onClick={() => {
                            this.props.store.dispatch({
                                type: 'ADD_RECIPE',
                                id: recipeIdx++,
                                name: recipeNameTxt.value,
                                ingredients: ingredientsTxt.value
                            });

                            recipeNameTxt.value = '',
                            ingredientsTxt.value = ''

                        }}>
                        Add Recipe
                    </button>
                </div>
            </div>


        );
    }
}

class RecipeList extends Component {
    constructor( props ){
        super(props);
    }

    componentDidMount() {
        this.unsubscribe = this.props.store.subscribe(() => {
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        let recipes = this.props.store.getState();
        return (
            <ul>
                {
                recipes.map( recipe => (
                    <li key={recipe.id}>{recipe.name} | {recipe.ingredients}</li>
                ))
                }
            </ul>    
        )
    }
}

class RecipeBox extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div id='container'>
                <AddRecipeContainer store={store} />
                <RecipeList store={store} />
            </div>

        );
    }
}

const render = () => {
    ReactDOM.render(
        <RecipeBox/>,
        document.getElementById('root')
    )
};

render();
