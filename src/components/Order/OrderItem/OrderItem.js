import React from 'react';
import { roundTwoNumber } from '../../../helpers/helper';
import classes from './OrderItem.css';

const OrderItem = props => {
  const { index, item, clicked } = props;

  return (
    <div className={classes.OrderItem} data={item} onClick={clicked}>
      <strong>{index}.</strong>
      <span>{`Name: ${item.fname}`}</span>
      <span>{`Email: ${item.email}`}</span>
      <span>{`Street: ${item.street}`}</span>
      <span>{`Postal code: ${item.postalCode}`}</span>
      <span>{`ID: ${item.id}`}</span>
      <span>{`Total price: ${roundTwoNumber(item.totalPrice)}`}</span>
    </div>
  );
};

export default OrderItem;
