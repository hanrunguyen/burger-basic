import React from 'react';
import { Button, Box, Text, Stack } from 'grommet';
import { More, Trash } from 'grommet-icons';

import { roundTwoNumber } from '../../../helpers/helper';

const mainColor = '#703b09';

const OrderItem = props => {
  const { index, item, clicked, deleteOrder } = props;

  return (
    <Stack anchor="top-left">
      <Box
        pad={{ vertical: 'xsmall', horizontal: 'small' }}
        margin="medium"
        animation="fadeIn"
        responsive={true}
        round="small"
        border={{ color: mainColor, size: 'small' }}
      >
        {item.fname && <Text>{`Name: ${item.fname}`}</Text>}
        {item.email && <Text>{`Email: ${item.email}`}</Text>}
        {item.street && <Text>{`Street: ${item.street}`}</Text>}
        {item.postalCode && <Text>{`Postal code: ${item.postalCode}`}</Text>}
        {item.id && <Text>{`ID: ${item.id}`}</Text>}
        {item.totalPrice && (
          <Text>{`Total price: ${roundTwoNumber(item.totalPrice)}`}</Text>
        )}
        <Box direction="row" justify="center" margin={{ bottom: 'small' }}>
          <Button
            label="More"
            color={mainColor}
            icon={<More color={mainColor} />}
            onClick={clicked}
            margin={{ horizontal: 'small' }}
          />
          <Button
            label="Delete"
            color={mainColor}
            icon={<Trash color={mainColor} />}
            onClick={deleteOrder}
            margin={{ horizontal: 'small' }}
          />
        </Box>
      </Box>
      <Box background={mainColor} pad={{ horizontal: 'xsmall' }} round>
        <Text>{index}</Text>
      </Box>
    </Stack>
  );
};

export default OrderItem;
