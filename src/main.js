import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Redux, { createStore } from 'redux';
import { Row, Button, ButtonToolbar } from 'react-bootstrap';
import { Modal, ModalTitle, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';


//const { Component } = React;
//const { createStore } = Redux;
//const { Modal, ModalTitle, ModalHeader, ModalBody, ModalFooter } = 'ReactBootstrap';
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

class RecipeModal extends Component {
    constructor (props) {
        super(props);

        let initRecipe = this.props.recipe;

        this.state = {
            show: false,
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
                        bsClass="default"
                    >
                        Close
                    </Button>
                    <Button onClick={ () => this.handleSaveClick() } 
                        className="btn-primary"
                    >
                        Save
                    </Button>
                </ModalFooter> 
            </Modal>

        );
    }
};

class AddRecipeButton extends Component {
    constructor (props) {
        super(props);

        this.state = {
            modalShow: false
        };

        this.resetRecipe();
    }

    resetRecipe() {
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
        //Reset recipe object
        this.resetRecipe();
    }

    render() {
        return (
            <ButtonToolbar>
                <Button
                    className="btn-primary"
                    onClick={ () => this.setState({modalShow: true}) }
                >   
                    Add Recipe
                </Button>
                <RecipeModal
                    title='Add Recipe'
                    recipe={ this.initRecipe }
                    show={ this.state.modalShow }
                    onHide={ () => this.setState({modalShow: false}) }
                    onSaveClick={ (recipe) => this.onSaveClick(recipe) }
                >
                </RecipeModal>
            </ButtonToolbar>    
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
            <div id='main-container'>
                <AddRecipeButton store={store} />
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
