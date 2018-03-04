import React, { Component } from 'react';
import { Panel, PanelGroup } from 'react-bootstrap';

import EditRecipeButton from './EditRecipeButton';
import DeleteRecipeButton from './DeleteRecipeButton';
import Ingredients from './Ingredients';

export default class Recipe extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        const recipe = this.props.recipe;
        return (
            <Panel eventKey={recipe.id} key={recipe.id}>
                <Panel.Heading className="clearfix">
                    <Panel.Title className="pull-left" toggle>{recipe.name}</Panel.Title>
                    <DeleteRecipeButton recipeId={recipe.id} store={this.props.store}/>
                    <EditRecipeButton recipe={recipe} store={this.props.store} />
                </Panel.Heading>
                <Panel.Body collapsible>
                    <Ingredients ingredients={recipe.ingredients}/>
                </Panel.Body>    
            </Panel>     
        );
    }
}