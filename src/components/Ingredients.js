import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class Ingredients extends Component {
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
