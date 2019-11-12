import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import axios, { getCancelTokenSource } from '../../api';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    item: null
  };

  componentDidMount() {
    const source = getCancelTokenSource();
    axios
      .get(`/orders/${this.props.match.params.id}.json`, {
        cancelToken: source.token
      })
      .then(res => this.setState({ item: res.data }))
      .catch(function(thrown) {
        if (thrown && thrown.message === 'cancel') {
          return;
        }
        return Promise.reject(thrown);
      });

    return () => {
      source.cancel('cancel');
    };
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.push('/checkout/contact-data');
  };

  render() {
    return (
      this.state.item && (
        <div>
          <CheckoutSummary
            ingredients={this.state.item.ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinue={this.checkoutContinueHandler}
          />
          <Route
            path="/contact-data"
            render={() => <ContactData ingredients={this.state.ingredients} />}
          />
        </div>
      )
    );
  }
}

export default Checkout;
