import React, { useState, useEffect } from 'react';
import { List, Text, Anchor, Box } from 'grommet';
import { LinkPrevious } from 'grommet-icons';

import { roundTwoNumber } from '../../../helpers/helper';
import axios, { getCancelTokenSource } from '../../../api';
import OrderTable from '../../Order/OrderTable/OrderTable';

const mainColor = '#703b09';

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

  const handleBackOrder = () => {
    props.history.push('/orders');
  };

  return (
    item && (
      <Box margin="medium">
        <Anchor
          label="Back to Order"
          onClick={handleBackOrder}
          icon={<LinkPrevious color={mainColor} />}
          color={mainColor}
          margin={{ vertical: 'small', top: 'small', bottom: 'medium' }}
        />
        <OrderTable ingredients={item.ingredients} />
        <Text
          textAlign="end"
          size="large"
          margin="small"
          weight="bold"
        >{`Total price: ${roundTwoNumber(item.totalPrice)}`}</Text>
        <Box margin={{ vertical: 'medium' }}>
          <Text size="large" margin={{ vertical: 'small' }} weight="bold">
            Information
          </Text>
          <List
            primaryKey="name"
            secondaryKey="value"
            data={[
              {
                name: 'Name',
                value: item.fname
              },
              {
                name: 'Email',
                value: item.email
              },
              {
                name: 'Street',
                value: item.street
              },
              {
                name: 'Postal code',
                value: item.postalCode
              }
            ]}
          />
        </Box>
      </Box>
    )
  );
};

export default OrderItemDetail;
