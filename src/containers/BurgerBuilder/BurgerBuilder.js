import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../api';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';

const INGREDIENT_PRICE = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};

class BurgerBuilder extends Component {
  unMounted = false;

  state = {
    ingredients: null,
    totalPrice: 4,
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
        this.setState({ ingredients: res.data }, () => {
          this.updatePurchaseState(this.state.ingredients);
        });
      })
      .catch(error => {
        if (this.unMounted) return;
        error && this.setState({ isError: true });
      });
  }

  componentWillUnmount() {
    this.unMounted = true;
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, elm) => {
        return sum + elm;
      }, 0);

    this.setState({ isPurchasable: sum > 0 });
  }

  purchaseHandler = () => {
    this.setState({ isPurchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ isPurchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout/contact-data');
    this.props.addOrder(this.state.ingredients, this.state.totalPrice);
  };

  addIngredientsHandler = type => {
    const { ingredients, totalPrice } = this.state;
    const oldCount = this.state.ingredients[type];
    const countedIngredient = oldCount + 1;
    const newIngredients = {
      ...ingredients,
      [type]: countedIngredient
    };

    this.setState({
      ingredients: newIngredients,
      totalPrice: totalPrice + INGREDIENT_PRICE[type]
    });

    this.updatePurchaseState(newIngredients);
  };

  removeIngredientsHandler = type => {
    const { ingredients, totalPrice } = this.state;
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const detuctedIngredient = oldCount - 1;
    const newIngredients = {
      ...ingredients,
      [type]: detuctedIngredient
    };

    this.setState({
      ingredients: newIngredients,
      totalPrice: totalPrice - INGREDIENT_PRICE[type]
    });

    this.updatePurchaseState(newIngredients);
  };

  render() {
    const disabledInfos = {
      ...this.state.ingredients
    };

    const {
      totalPrice,
      ingredients,
      isLoading,
      isPurchasing,
      isPurchasable,
      isError
    } = this.state;

    let orderSummary = (
      <Aux>
        <Modal show={isPurchasing} closeModal={this.purchaseCancelHandler}>
          <OrderSummary
            price={totalPrice}
            ingredients={ingredients}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
          />
        </Modal>
        <Burger ingredients={ingredients} />
      </Aux>
    );

    if (isLoading || !ingredients) {
      orderSummary = <Spinner />;
    }

    if (isError) {
      orderSummary = (
        <p style={{ textAlign: 'center' }}>Your burger can not be loaded</p>
      );
    }

    for (let key in disabledInfos) {
      disabledInfos[key] = disabledInfos[key] <= 0;
    }

    return (
      <Aux>
        {orderSummary}

        <BuildControls
          ingredientAdded={this.addIngredientsHandler}
          ingredientRemoved={this.removeIngredientsHandler}
          price={totalPrice}
          disabled={disabledInfos}
          purchasable={!isPurchasable}
          order={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addOrder: (ingredients, totalPrice) =>
    dispatch({ type: 'ADD_ORDER', ingredients, totalPrice })
});

export default connect(
  null,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
