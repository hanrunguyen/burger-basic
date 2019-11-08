import React, { useState, useEffect } from 'react';
import OrderItem from '../../components/Order/OrderItem/OrderItem';
import firebase from '../../firebase';

const OrderList = props => {
  const [list, setList] = useState(null);

  useEffect(() => {
    const ordersReference = firebase.database().ref('orders');

    const onOrdersChange = ref => {
      setList(ref.val());
    };

    ordersReference.on('value', onOrdersChange);

    return () => {
      ordersReference.off('value', onOrdersChange);
    };
  }, []);

  const handleClick = item => {
    props.history.push(`/order/${item}`);
  };

  return (
    list &&
    Object.keys(list).map((item, idx) => (
      <OrderItem
        key={list[item].id}
        item={list[item]}
        index={idx + 1}
        clicked={() => handleClick(item)}
      />
    ))
  );
};

export default OrderList;
