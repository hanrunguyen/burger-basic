import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, List, Heading, Markdown, Box } from 'grommet';

import axios from '../../../api';
import FormInfo from '../../../components/FormInfo/FormInfo';
import { timeId, roundTwoNumber } from '../../../helpers/helper';

import classes from './ContactData.css';

class ContactData extends Component {
  unMounted = false;
  state = {
    ingredients: null,
    totalPrice: 4,
    isPurchasable: false,
    isPurchasing: false,
    isLoading: false,
    isError: false,
    info: {
      name: '',
      email: '',
      address: {
        street: '',
        postalCode: ''
      }
    }
  };

  componentWillUnmount() {
    this.unMounted = true;
  }

  render() {
    const { ingredients, totalPrice } = this.props.payload || {};

    return (
      <Box
        margin="medium"
        align="center"
        className={classes.ContactData}
        animation="fadeIn"
      >
        {ingredients ? (
          <React.Fragment>
            <Box margin="small">
              <Heading level="3" textAlign="center" responsive={true}>
                Here is your detail order
              </Heading>
              <List
                primaryKey="name"
                secondaryKey="value"
                data={Object.keys(ingredients).map(ingredient => ({
                  name: ingredient,
                  value: ingredients[ingredient]
                }))}
              />
              {totalPrice && (
                <Text
                  size="large"
                  margin="small"
                  weight="bold"
                >{`Total price: ${roundTwoNumber(totalPrice)}`}</Text>
              )}
            </Box>
            <FormInfo
              ingredients={ingredients}
              totalPrice={totalPrice}
              history={this.props.history}
            />
          </React.Fragment>
        ) : (
          <Markdown size="medium">## Please go [here](/) to order</Markdown>
        )}
      </Box>
    );
  }
}

const mapStatetoProps = state =>
  state && {
    payload: state.payload
  };

export default connect(mapStatetoProps)(ContactData);
