import React from 'react';
import { TableBody } from 'grommet';

import BuildControl from './BuildControl/BuildControl';

const BuildControls = props => (
  <React.Fragment>
    <TableBody>
      {props.ingredients &&
        Object.keys(props.ingredients).map(keyIngredient => {
          const ingredient = props.ingredients[keyIngredient];
          return (
            <BuildControl
              key={ingredient.label}
              added={() => props.ingredientAdded(keyIngredient)}
              removed={() => props.ingredientRemoved(keyIngredient)}
              price={props.price}
              ingredient={ingredient}
              disabled={props.disabled[keyIngredient]}
            />
          );
        })}
    </TableBody>
  </React.Fragment>
);

export default BuildControls;
