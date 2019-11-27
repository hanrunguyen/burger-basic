import React from 'react';
import { Text } from 'grommet';

import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

import classes from './Burger.css';

const Burger = props => {
  const { ingredients } = props;
  let transformedIngredients = Object.keys(ingredients)
    .map(igKey => {
      return [...Array(ingredients[igKey].quantity)].map((_, idx) => {
        return <BurgerIngredients key={igKey + idx} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <Text>Please adding the ingredients</Text>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {transformedIngredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

export default Burger;
