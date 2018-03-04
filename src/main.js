import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import localStorageUtil from './util/localStorageUtil';
import RecipeBox from './app/RecipeBox';
import store from './redux/store';

/** 
import { Row, Button, ButtonToolbar } from 'react-bootstrap';
import { Modal, ModalTitle, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Panel, PanelGroup } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
*/

/** Store and retreive from local storage */
window.onbeforeunload = function() {
    localStorageUtil.storeIntoLocalStorage(store.getState());
}

const render = () => {
    ReactDOM.render(
        <RecipeBox/>,
        document.getElementById('root')
    )
};

render();
