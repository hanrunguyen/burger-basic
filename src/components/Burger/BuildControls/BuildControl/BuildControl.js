import React from 'react';
import { Button, Text, Box } from 'grommet';
import { Add, Subtract } from 'grommet-icons';

const mainColor = '#703b09';

const BuildControl = props => (
  <Box direction="row">
    <Text size="medium" alignSelf="center">
      {props.label}
    </Text>

    <Button
      onClick={props.removed}
      disabled={props.disabled}
      icon={<Subtract color={mainColor} />}
      color={mainColor}
    />

    <Button onClick={props.added} icon={<Add color={mainColor} />} />
  </Box>
);

export default BuildControl;
