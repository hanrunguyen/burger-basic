import React, { useState, useEffect } from 'react';
import { roundTwoNumber } from '../../../helpers/helper';
import axios, { getCancelTokenSource } from '../../../api';
import classes from './OrderItemDetail.css';

const OrderItemDetail = props => {
  const {
    match: { params }
  } = props;
  const [item, setItem] = useState('');

  useEffect(() => {
    const source = getCancelTokenSource();

    axios
      .get(`/orders/${params.id}.json`, { cancelToken: source.token })
      .then(res => setItem(res.data))
      .catch(function(thrown) {
        if (thrown && thrown.message === 'cancel') {
          return;
        }
        return Promise.reject(thrown);
      });

    return () => {
      source.cancel('cancel');
    };
  }, [params.id]);

  return (
    item && (
      <div className={classes.OrderItemDetail}>
        {Object.keys(item.ingredients).map((elm, idx) => (
          <span key={idx}>{`${elm}: ${item.ingredients[elm]}`}</span>
        ))}
        <span>{`Total price: ${roundTwoNumber(item.totalPrice)}`}</span>
      </div>
    )
  );
};

export default OrderItemDetail;
