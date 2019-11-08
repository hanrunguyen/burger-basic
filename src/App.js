import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import OrderList from './containers/OrderList/OrderList';
import OrderItemDetail from './components/Order/OrderItemDetail/OrderItemDetail';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
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
