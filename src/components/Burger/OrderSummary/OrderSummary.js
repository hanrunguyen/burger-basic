import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => (
    <li key={igKey}>
      <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:
      {props.ingredients[igKey]}
    </li>
  ));

  return (
    <Aux>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total price: {props.price.toFixed(2)}</strong>
      </p>
      <p>You wanna checkout?</p>
      <Button clicked={props.purchaseCancel} btnType={'Danger'}>
        CANCEL
      </Button>
      <Button clicked={props.purchaseContinue} btnType={'Success'}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;
