import React, { Component } from 'react';
import { Row, Button, ButtonToolbar } from 'react-bootstrap';
import RecipeModal from './RecipeModal';
import store from '../redux/store';

const getNextIdx = () => {
    let recipes = store.getState() || [],
        nextIdx = 0;
    if (recipes.length > 0) {
        let lastUsedId = recipes[recipes.length - 1]['id'];
        nextIdx = lastUsedId + 1;
    }    
    return nextIdx;
};

//Initialize the id
let recipeIdx = getNextIdx();

/**
 * Control button for adding a new recipe
 */
export default class AddRecipeButton extends Component {
    constructor (props) {
        super(props);

        this.state = {
            modalShow: false
        };

        this.initRecipe = {
            name: '',
            ingredients: ''
        };
    }

    onSaveClick(recipe) {
        //Dispatch the action for adding recipe
        this.props.store.dispatch({
            type: 'ADD_RECIPE',
            id: recipeIdx++,
            name: recipe.name,
            ingredients: recipe.ingredients
        });
        //Close the modal
        this.setState({modalShow: false});
    }

    render() {
        return (
            <ButtonToolbar id='add-button-container'>
                <Button
                    className="btn btn-primary pull-right"
                    onClick={ () => this.setState({modalShow: true}) }
                >   
                    Add Recipe
                </Button>
                {
                    this.state.modalShow ?
                    <RecipeModal
                        title='Add Recipe'
                        recipe={ this.initRecipe }
                        show={ true }
                        onHide={ () => this.setState({modalShow: false}) }
                        onSaveClick={ (recipe) => this.onSaveClick(recipe) }
                    >
                    </RecipeModal>
                    :null
                }
            </ButtonToolbar>    
        );
    }
}
