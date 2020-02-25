import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients : null,
    error : false,
    totalPrice : 4,
    building : false
};

const INGREDIENT_PRICES    = {
    salad : 0.2,
    bacon : 0.4,
    cheese : 0.3,
    meat : 0.5
};

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName] : state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building : true
    };
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const removedIngredient = { [action.ingredientName] : state.ingredients[action.ingredientName] - 1 };
    const removedIngredients = updateObject(state.ingredients, removedIngredient);
    const removedState = {
        ingredients: removedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    };
    return updateObject(state, removedState);
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        error: false,
        totalPrice: 4,
        building : false
    });
};

const reducer = (state = initialState, action) => {

    switch(action.type) {

        case actionTypes.ADD_INGREDIENT :
            return addIngredient(state, action);

        case actionTypes.REMOVE_INGREDIENT :
            return removeIngredient(state, action);

        case actionTypes.SET_INGREDIENTS :
            return setIngredients(state, action);

        case actionTypes.FETCH_INGREDIENTS_FAILED :
            return updateObject(state,{ error : true });

        default:
            return state;
    }

};

export default reducer;