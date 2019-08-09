import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, elm) => {
        return sum + elm;
      }, 0);

    this.setState({
      purchasable: sum > 0
    });
  }

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

    for (let key in disabledInfos) {
      disabledInfos[key] = disabledInfos[key] <= 0;
    }

    return (
      <Aux>
        <Modal>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientsHandler}
          ingredientRemoved={this.removeIngredientsHandler}
          price={this.state.totalPrice}
          disabled={disabledInfos}
          purchasable={!this.state.purchasable}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
