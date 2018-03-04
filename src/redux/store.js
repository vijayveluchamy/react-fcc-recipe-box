import Redux, { createStore } from 'redux';
import recipeListReducer from './recipeListReducer';
import localStorageUtil from '../util/localStorageUtil';

// Create store from reducer
const store = createStore(recipeListReducer, localStorageUtil.retreiveFromLocalStorage());

export default store;
