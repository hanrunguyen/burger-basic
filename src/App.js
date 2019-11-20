import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import OrderList from './containers/OrderList/OrderList';
import OrderItemDetail from './components/Order/OrderItemDetail/OrderItemDetail';
import ContactData from './containers/Checkout/ContactData/ContactData';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout/contact-data" component={ContactData} />
            <Route path="/orders" component={OrderList} />
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/order/:id" component={OrderItemDetail} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
