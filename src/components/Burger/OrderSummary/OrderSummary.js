import React from 'react';
import { Heading, Paragraph, Button, Text, List, Box } from 'grommet';

const mainColor = '#703b09';

const OrderSummary = props => {
  return (
    <Box>
      <Heading level="2" textAlign="center">Your order</Heading>
      <Paragraph>A delicious burger with the following ingredients:</Paragraph>
      <List
        primaryKey="name"
        secondaryKey="value"
        data={Object.keys(props.ingredients).map(igKey => ({
          name: igKey,
          value: props.ingredients[igKey]
        }))}
      />
      <Text
        size="medium"
        margin="small"
        weight="bold"
        textAlign="end"
        pad="small"
      >
        Total price: {props.price.toFixed(2)}
      </Text>
      <Paragraph>You wanna checkout?</Paragraph>
      <Box direction="row" justify="center">
        <Button
          onClick={props.purchaseCancel}
          label="CANCEL"
          margin="small"
          color={mainColor}
        />
        <Button
          onClick={props.purchaseContinue}
          label="CONTINUE"
          margin="small"
          color={mainColor}
        />
      </Box>
    </Box>
  );
};

export default OrderSummary;
