import React, { Component } from 'react'; 

export default class DeleteRecipeButton extends Component {
    handleClick(e) {
        e.preventDefault();
        this.props.store.dispatch({
            type: 'DELETE_RECIPE',
            id: this.props.recipeId
        })
    }

    render(){
        return (
            <a 
                className="btn-link pull-right ctrl-button-link"
                tooltip="Delete"
                onClick={
                    (e) => this.handleClick(e)
                }
            >
                <span className="glyphicon glyphicon-trash"></span>
            </a>
        );
    }
}