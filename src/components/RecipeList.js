import React, {Component} from 'react';
import { Panel, PanelGroup } from 'react-bootstrap';
import Recipe from './Recipe';

/**
 * Container to display the list of recipes
 */
export default class RecipeList extends Component {
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