import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Button,
  Text,
  Table,
  TableHeader,
  TableRow,
  TableCell
} from 'grommet';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../api';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { addOrder } from '../../store/actionsCreator';
import { roundTwoNumber } from '../../helpers/helper';
import { MIN, MAX } from '../../constans';

class BurgerBuilder extends Component {
  unMounted = false;

  state = {
    originalIngredients: null,
    currentIngredients: null,
    totalPrice: 0,
    isPurchasable: false,
    isPurchasing: false,
    isLoading: false,
    isError: false
  };

  componentDidMount() {
    axios
      .get('/ingredients.json')
      .then(res => {
        if (this.unMounted) return;
        this.setState(
          { originalIngredients: res.data, currentIngredients: res.data },
          () => {
            this.updatePurchaseState(this.state.totalPrice);
          }
        );
      })
      .catch(error => {
        if (this.unMounted) return;
        error && this.setState({ isError: true });
      });
  }

  componentWillUnmount() {
    this.unMounted = true;
  }

  updatePurchaseState(totalPrice) {
    this.setState({ isPurchasable: totalPrice > 0 });
  }

  purchaseHandler = () => {
    this.setState({ isPurchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ isPurchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout/contact-data');
    this.props.addOrder(this.state.currentIngredients, this.state.totalPrice);
  };

  addIngredientsHandler = type => {
    const { originalIngredients, currentIngredients, totalPrice } = this.state;
    const oldQuantity = currentIngredients[type].quantity;
    if (oldQuantity > MAX) {
      return;
    }
    const numberOfAddingIngredient = oldQuantity + 1;
    const updatedIngredients = {
      ...currentIngredients,
      [type]: {
        ...originalIngredients[type],
        quantity: numberOfAddingIngredient
      }
    };

    this.setState(
      {
        currentIngredients: updatedIngredients,
        totalPrice: totalPrice + originalIngredients[type].price
      },
      () => {
        this.updatePurchaseState(this.state.totalPrice);
      }
    );
  };

  removeIngredientsHandler = type => {
    const { originalIngredients, currentIngredients, totalPrice } = this.state;
    const oldQuantity = currentIngredients[type].quantity;
    if (oldQuantity <= MIN) {
      return;
    }
    const numberOfDetuctingIngredient = oldQuantity - 1;
    const updatedIngredients = {
      ...currentIngredients,
      [type]: {
        ...originalIngredients[type],
        quantity: numberOfDetuctingIngredient
      }
    };

    this.setState(
      {
        currentIngredients: updatedIngredients,
        totalPrice: totalPrice - originalIngredients[type].price
      },
      () => {
        this.updatePurchaseState(this.state.totalPrice);
      }
    );
  };

  render() {
    const {
      totalPrice,
      currentIngredients,
      isLoading,
      isPurchasing,
      isPurchasable,
      isError
    } = this.state;

    const disabledInfos = {
      ...currentIngredients
    };

    let orderSummary = (
      <React.Fragment>
        <Modal show={isPurchasing} closeModal={this.purchaseCancelHandler}>
          <OrderSummary
            totalPrice={totalPrice}
            ingredients={currentIngredients}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
          />
        </Modal>
        <Burger ingredients={currentIngredients} />
      </React.Fragment>
    );

    if (isLoading || !currentIngredients) {
      orderSummary = <Spinner />;
    }

    if (isError) {
      orderSummary = (
        <p style={{ textAlign: 'center' }}>Your burger can not be loaded</p>
      );
    }

    for (let key in disabledInfos) {
      disabledInfos[key] = {
        add: disabledInfos[key].quantity >= MAX,
        minus: disabledInfos[key].quantity <= MIN
      };
    }

    return (
      <Box direction="row" alignContent="center" justify="center">
        {orderSummary}
        <Box>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell scope="col" border="bottom">
                  Name
                </TableCell>
                <TableCell scope="col" border="bottom">
                  Price
                </TableCell>
                <TableCell scope="col" border="bottom">
                  Quantity
                </TableCell>
                <TableCell scope="col" border="bottom">
                  Sum
                </TableCell>
              </TableRow>
            </TableHeader>

            <BuildControls
              ingredientAdded={this.addIngredientsHandler}
              ingredientRemoved={this.removeIngredientsHandler}
              ingredients={currentIngredients}
              price={totalPrice}
              disabled={disabledInfos}
            />
          </Table>
          <Text
            size="medium"
            margin="small"
            textAlign="center"
          >{`Total price: ${roundTwoNumber(totalPrice)}`}</Text>
          <Button
            disabled={!isPurchasable}
            onClick={this.purchaseHandler}
            label="ORDER NOW"
            color="#703b09"
          />
        </Box>
      </Box>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addOrder: (ingredients, totalPrice) =>
    dispatch(addOrder(ingredients, totalPrice))
});

export default connect(
  null,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
