import React, { Component } from 'react';
import { Row, Button, ButtonToolbar } from 'react-bootstrap';
import RecipeModal from './RecipeModal';

/**
 * Control button for editing a recipe
 */
export default class EditRecipeButton extends Component {
    constructor (props) {
        super(props);

        this.state = {
            modalShow: false
        };
    }

    onSaveClick(recipe) {
        //Dispatch the action for adding recipe
        this.props.store.dispatch({
            type: 'UPDATE_RECIPE',
            id: recipe.id,
            name: recipe.name,
            ingredients: recipe.ingredients
        });
        //Close the modal
        this.setState({modalShow: false});
    }

    render() {
        return (
            <ButtonToolbar className='edit-button-container'>
                <a
                    className="btn-link pull-right ctrl-button-link"
                    onClick={ () => this.setState({modalShow: true}) }
                >   
                    <span className="glyphicon glyphicon-pencil"></span>
                </a>
                {
                    this.state.modalShow ?
                    <RecipeModal
                        title='Edit Recipe'
                        recipe={ this.props.recipe }
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