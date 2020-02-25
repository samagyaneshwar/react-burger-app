import React from 'react';
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {

    

    const transformedIngredients = Object.keys(props.ingredients);
    let ingredients = transformedIngredients.map((key) => {
        return [...Array(props.ingredients[key])].map((_,i) => {
            return <BurgerIngredient key={ key + i } type={ key } />
        });
    });

    const ingredientsExists = Object.values(props.ingredients).some((key,i) =>{
        return key > 0;
    });
    

    ingredients = ingredientsExists ? ingredients : <p>Please start adding ingredients</p>;
                                    
    return (
        <div className={ classes.Burger }>
            <BurgerIngredient type="bread-top" />
            {ingredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;