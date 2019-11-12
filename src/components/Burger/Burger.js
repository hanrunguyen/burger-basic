import React from 'react';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import classes from './Burger.css';

const Burger = props => {
  const { ingredients } = props;
  let transformedIngredients = Object.keys(ingredients)
    .map(igKey => {
      return [...Array(ingredients[igKey])].map((_, idx) => {
        return <BurgerIngredients key={igKey + idx} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please adding the ingredients</p>;
  }

  console.log('transformedIngredients', transformedIngredients);

  return (
    <div className={classes.Burger}>
      <BurgerIngredients type='bread-top' />
      {transformedIngredients}
      <BurgerIngredients type='bread-bottom' />
    </div>
  );
};

export default Burger;
