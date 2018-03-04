import React, {Component} from 'react';
import { Row, Button, ButtonToolbar } from 'react-bootstrap';
import { Modal, ModalTitle, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';


/**
 * Modal dialog to add/edit recipe
 */
export default class RecipeModal extends Component {
    constructor (props) {
        super(props);

        let initRecipe = this.props.recipe;

        this.state = {
            show: false,
            recipeId: initRecipe.id,
            recipeName: initRecipe.name,
            recipeIngredients: initRecipe.ingredients
        };
        
    }

    handleInputChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    handleSaveClick() {
        if (this.state.recipeName && this.state.recipeIngredients) {
            var recipe = {
                id: this.state.recipeId,
                name: this.state.recipeName,
                ingredients: this.state.recipeIngredients
            }
            this.props.onSaveClick(recipe);
        }
    }

    render() {
        
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <ModalHeader closeButton>
                    <ModalTitle>
                        {this.props.title}
                    </ModalTitle>
                </ModalHeader>

                <ModalBody>
                    <Form>
                        <FormGroup controlId="formRecipeName">
                            <ControlLabel>Recipe Name</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.recipeName}
                                name='recipeName'
                                onChange={ e => this.handleInputChange(e) }
                            >
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId="formRecipeIngr">
                            <ControlLabel>Ingredients</ControlLabel>
                            <FormControl
                                componentClass="textarea"
                                value={this.state.recipeIngredients}
                                name='recipeIngredients'
                                onChange={ e => this.handleInputChange(e) }
                            >
                            </FormControl>
                        </FormGroup>
                    </Form>    
                </ModalBody>   
                <ModalFooter>
                    <Button onClick={ this.props.onHide } 
                        className="btn btn-default"
                    >
                        Close
                    </Button>
                    <Button onClick={ () => this.handleSaveClick() } 
                        className="btn btn-primary"
                    >
                        Save
                    </Button>
                </ModalFooter> 
            </Modal>

        );
    }
};