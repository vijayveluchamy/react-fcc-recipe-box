import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Redux, { createStore } from 'redux';
import { Row, Button, ButtonToolbar } from 'react-bootstrap';
import { Modal, ModalTitle, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Panel, PanelGroup } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

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
            return state.filter(recipe => recipe.id !== action.id);
        default:
            return state;

    }
}

// Create store from reducer
const store = createStore(recipeListReducer);



/** UI Elements */
let recipeIdx = 0;

/**
 * Modal dialog to add/edit recipe
 */
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

/**
 * Control button for adding a new recipe
 */
class AddRecipeButton extends Component {
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

class DeleteRecipeButton extends Component {
    handleClick(e) {
        e.preventDefault();
        this.props.store.dispatch({
            type: 'DELETE_RECIPE',
            id: this.props.recipeId
        })
    }

    render(){
        return (
            <button 
                className="btn btn-link pull-right"
                tooltip="Delete"
                onClick={
                    (e) => this.handleClick(e)
                }
            >
                <span className="glyphicon glyphicon-trash"></span>
            </button>
        );
    }
}

class Ingredients extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        let ing = this.props.ingredients;
        if (!ing) {return;}
        let ingArray = ing.split(',');

        return (
            <ListGroup>
            {
                ingArray.map( ing => (
                    <ListGroupItem key={ing.trim()}>{ing.trim()}</ListGroupItem>
                ))
            }
            </ListGroup>            
        );
    }
}

class Recipe extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        const recipe = this.props.recipe;
        return (
            <Panel eventKey={recipe.id}>
                <Panel.Heading className="clearfix">
                    <Panel.Title className="pull-left" toggle>{recipe.name}</Panel.Title>
                    <DeleteRecipeButton recipeId={recipe.id} store={this.props.store}/>
                </Panel.Heading>
                <Panel.Body collapsible>
                    <Ingredients ingredients={recipe.ingredients}/>
                </Panel.Body>    
            </Panel>     
        );
    }
}

/**
 * Container to display the list of recipes
 */
class RecipeList extends Component {
    constructor( props ){
        super(props);

        this.state = {
            activeKey: ''
        };
    }

    componentDidMount() {
        this.unsubscribe = this.props.store.subscribe(() => {
            this.forceUpdate();
        });
    }

    handleSelect(activeKey) {
        this.setState({ activeKey });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        let recipes = this.props.store.getState();
        return (
            <PanelGroup
                accordion
                id='recipe-list'
                activeKey={ this.state.activeKey }
                onSelect={ (key) => this.handleSelect(key) }
            >
                {
                recipes.map( recipe => (
                    <Recipe key={recipe.id} recipe={recipe} store={this.props.store}>
                    </Recipe>
                ))
                }
            </PanelGroup>    
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
                <header id='app-header'>Recipe Box</header>
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
