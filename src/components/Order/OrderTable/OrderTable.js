import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from 'grommet';

import { roundTwoNumber } from '../../../helpers/helper';

const OrderTable = ({ ingredients }) =>
  ingredients && (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Sum</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.keys(ingredients).map(ingredientKey => {
          const ingredient = ingredients[ingredientKey];
          return (
            <TableRow key={ingredientKey}>
              <TableCell>{ingredient.label}</TableCell>
              <TableCell>{ingredient.price}</TableCell>
              <TableCell>{ingredient.quantity}</TableCell>
              <TableCell>
                {roundTwoNumber(ingredient.price * ingredient.quantity)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );

export default OrderTable;
