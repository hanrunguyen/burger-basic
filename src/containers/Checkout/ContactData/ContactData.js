import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';

import axios from '../../../api';
import Button from '../../../components/UI/Button/Button';
import { timeId } from '../../../helpers/helper';
import { emailPattern } from '../../../helpers/patterns';

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
    const { ingredients, totalPrice } = this.props;

    return (
      <div className={classes.ContactData}>
        <p>Here is your detail order</p>
        <ul>
          {Object.keys(ingredients).map(ingredient => (
            <li
              key={ingredient}
            >{`${ingredient}: ${ingredients[ingredient]}`}</li>
          ))}
        </ul>
        <span>{`Total price: ${totalPrice}`}</span>
        <h4>Enter your contact</h4>
        <Formik
          initialValues={{ fname: '', email: '', street: '', postalCode: '' }}
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
            <Form>
              <label className={classes.Label} htmlFor="fname">
                Name
              </label>
              <Field
                className={classes.Input}
                id="fname"
                type="text"
                name="fname"
                placeholder="Your name"
              />
              <ErrorMessage
                name="fname"
                component="div"
                className={classes.ErrorMessage}
              />
              <label className={classes.Label} htmlFor="email">
                Email
              </label>
              <Field
                className={classes.Input}
                id="email"
                type="text"
                name="email"
                placeholder="Your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={classes.ErrorMessage}
              />
              <label className={classes.Label} htmlFor="street">
                Street
              </label>
              <Field
                className={classes.Input}
                id="street"
                type="text"
                name="street"
                placeholder="Street"
              />
              <label className={classes.Label} htmlFor="postal-code">
                Postal code
              </label>
              <Field
                className={classes.Input}
                id="postal-code"
                type="text"
                name="postalCode"
                placeholder="Postal code"
              />
              <Button btnType="Success" type="submit" disabled={isSubmitting}>
                ORDER
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapStatetoProps = state =>
  state && {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };

export default connect(mapStatetoProps)(ContactData);
