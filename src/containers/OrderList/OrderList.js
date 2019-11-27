import React, { useState, useEffect } from 'react';

import firebase from '../../firebase';
import OrderItem from '../../components/Order/OrderItem/OrderItem';
import { Box, Text } from 'grommet';

const OrderList = props => {
  const [list, setList] = useState(null);
  const [deletedStatus, setDeletedStatus] = useState({ isDeleted: false });

  useEffect(() => {
    const ordersRef = firebase.database().ref('orders');

    const onOrdersChange = ref => {
      setList(ref.val());
    };

    ordersRef.on('value', onOrdersChange);

    return () => {
      ordersRef.off('value', onOrdersChange);
    };
  }, []);

  const handleClick = id => {
    props.history.push(`/order/${id}`);
  };

  const handleDeleteOrder = id => {
    const orderRef = firebase.database().ref(`orders/${id}`);
    orderRef
      .remove()
      .then(() => {
        setDeletedStatus({ isDeleted: true });
      })
      .catch(error => {
        setDeletedStatus({ isDeleted: false, error });
      });
  };

  return (
    <Box margin="medium">
      {deletedStatus.isDeleted && (
        <Box align="center">
          <Text color="neutral-1">The order is deleted</Text>
        </Box>
      )}
      {deletedStatus.error && (
        <Box align="center">
          <Text>{`The order can not be deleted with error ${deletedStatus.error}`}</Text>
        </Box>
      )}
      {list &&
        Object.keys(list).map((item, idx) => (
          <OrderItem
            key={list[item].id}
            item={list[item]}
            index={idx + 1}
            clicked={() => handleClick(item)}
            deleteOrder={() => handleDeleteOrder(item)}
          />
        ))}
    </Box>
  );
};

export default OrderList;
