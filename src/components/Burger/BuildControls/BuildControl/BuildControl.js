import React from 'react';
import { Button, TableRow, TableCell } from 'grommet';
import { Add, Subtract } from 'grommet-icons';

import { roundTwoNumber } from '../../../../helpers/helper';

const mainColor = '#703b09';

const BuildControl = ({ ingredient, added, removed, disabled }) => (
  <TableRow>
    <TableCell scope="row">{ingredient.label}</TableCell>
    <TableCell scope="row">{ingredient.price}</TableCell>
    <TableCell>{ingredient.quantity}</TableCell>
    <TableCell>
      {roundTwoNumber(ingredient.quantity * ingredient.price)}
    </TableCell>
    <TableCell>
      <Button
        onClick={removed}
        disabled={disabled.minus}
        icon={<Subtract color={mainColor} size="small" />}
        color={mainColor}
      />
    </TableCell>
    <TableCell>
      <Button
        onClick={added}
        disabled={disabled.add}
        icon={<Add color={mainColor} size="small" />}
      />
    </TableCell>
  </TableRow>
);

export default BuildControl;
