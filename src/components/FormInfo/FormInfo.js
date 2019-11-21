import React, { Component } from 'react';
import { FormField, Button, Heading, Box } from 'grommet';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import axios from '../../api';
import { emailPattern } from '../../helpers/patterns';
import { timeId } from '../../helpers/helper';

import classes from './FormInfo.css';

class FormInfo extends Component {
  unMounted = false;

  state = {
    isLoading: false,
    isPurchasing: false
  };

  componentWillUnmount() {
    this.unMounted = true;
  }

  orderHandler = valueInfo => {
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      id: timeId(),
      ...valueInfo
    };

    this.setState({ isLoading: true });
    axios
      .post('orders.json', order)
      .then(
        () =>
          !this.unMounted &&
          this.setState({ isLoading: false, isPurchasing: false })
      )
      .catch(error => {
        if (this.unMounted) return;
        this.setState({ isLoading: false, isPurchasing: false });
        console.log(error);
      });
  };

  render() {
    return (
      <Box margin="small" align="center">
        <Heading level="3">Please fill your contact</Heading>
        <Formik
          initialValues={{
            fname: '',
            email: '',
            street: '',
            postalCode: ''
          }}
          validate={values => {
            const errors = {};
            if (!values.fname) {
              errors.fname = 'Required';
            }
            if (!values.email) {
              errors.email = 'Required';
            } else if (!emailPattern(values.email)) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              this.orderHandler(values);
              this.props.history.push('/orders');
            }, 400);
          }}
        >
          {({ values, isSubmitting }) => (
            <Box>
              <Form>
                <FormField
                  label="Name"
                  name="fname"
                  htmlFor="fname"
                  size="medium"
                >
                  <Field
                    className={classes.Input}
                    id="fname"
                    type="text"
                    name="fname"
                  />
                </FormField>
                <ErrorMessage
                  name="fname"
                  component="div"
                  className={classes.ErrorMessage}
                />
                <FormField label="Email" name="email" htmlFor="email">
                  <Field
                    className={classes.Input}
                    id="email"
                    type="text"
                    name="email"
                  />
                </FormField>
                <ErrorMessage
                  name="email"
                  component="div"
                  className={classes.ErrorMessage}
                />
                <FormField label="Street" name="street" htmlFor="street">
                  <Field
                    className={classes.Input}
                    id="street"
                    type="text"
                    name="street"
                  />
                </FormField>
                <FormField
                  label="Postal code"
                  name="postalCode"
                  htmlFor="postalCode"
                >
                  <Field
                    className={classes.Input}
                    id="postal-code"
                    type="text"
                    name="postalCode"
                  />
                </FormField>
                <Button
                  btnType="Success"
                  type="submit"
                  disabled={isSubmitting || !this.props.ingredients}
                  label="Order"
                  color="#703b09"
                  alignSelf="center"
                />
              </Form>
            </Box>
          )}
        </Formik>
      </Box>
    );
  }
}

export default FormInfo;
