import React from 'react';
import { Button, Heading, Box } from 'grommet';

import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const BuildControls = props => (
  <Box direction="column" align="center" pad="medium" background="accent-4">
    <Heading level="4">
      Current price <strong>{props.price.toFixed(2)}</strong>
    </Heading>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        price={props.price}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <Button
      disabled={props.purchasable}
      onClick={props.order}
      label="ORDER NOW"
      color="#703b09"
      margin="medium"
    />
  </Box>
);

export default BuildControls;
