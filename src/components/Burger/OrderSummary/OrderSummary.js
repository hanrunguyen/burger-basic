import React from 'react';
import { Heading, Paragraph, Button, Text, Box } from 'grommet';

import OrderTable from '../../Order/OrderTable/OrderTable';

const mainColor = '#703b09';

const OrderSummary = ({
  ingredients,
  totalPrice,
  purchaseCancel,
  purchaseContinue
}) => {
  return (
    <Box>
      <Heading level="2" textAlign="center">
        Your order
      </Heading>
      <Paragraph>A delicious burger with the following ingredients:</Paragraph>

      <OrderTable ingredients={ingredients} />

      <Text
        size="medium"
        margin="small"
        weight="bold"
        textAlign="end"
        pad="small"
      >
        Total price: {totalPrice.toFixed(2)}
      </Text>
      <Paragraph>You wanna checkout?</Paragraph>
      <Box direction="row" justify="center">
        <Button
          onClick={purchaseCancel}
          label="CANCEL"
          margin="small"
          color={mainColor}
        />
        <Button
          onClick={purchaseContinue}
          label="CONTINUE"
          margin="small"
          color={mainColor}
        />
      </Box>
    </Box>
  );
};

export default OrderSummary;
