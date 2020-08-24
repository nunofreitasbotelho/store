import { Checkout, Product, CheckoutProduct } from '../../../shared';
import { createReducer, on, Action } from '@ngrx/store';
import * as checkoutActions from '../actions/checkout';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';

const INITIAL_STATE: State = {
  checkout: { products: [], total: 0, items: 0 },
};

export interface State {
  checkout: Checkout;
}

const checkoutReducer = createReducer(
  INITIAL_STATE,
  on(checkoutActions.addToCart, (state, { payload }) => {
    let updatedState = JSON.parse(JSON.stringify(state)) as State;

    const findProduct = updatedState.checkout.products.find(
      (item: CheckoutProduct) => item.product.id === payload.product.id
    );
    if (findProduct) {
      findProduct.quantity += 1;
      findProduct.subTotal = findProduct.product.price * findProduct.quantity;
    } else {
      updatedState.checkout.products.push({
        product: payload.product,
        quantity: 1,
        subTotal: payload.product.price,
      });
    }

    updatedState = {
      ...updatedState,
      checkout: {
        ...updatedState.checkout,
        total: getTotal(updatedState.checkout.products),
        items: getItemsCount(updatedState.checkout.products),
      },
    };
    return updatedState;
  }),
  on(checkoutActions.removeFromCart, (state, { payload }) => {
    let updatedState = JSON.parse(JSON.stringify(state)) as State;

    const findProduct = updatedState.checkout.products.find(
      (item: CheckoutProduct) => item.product.id === payload.productId
    );

    if (payload.quantity && findProduct.quantity > 1) {
      findProduct.quantity -= payload.quantity;
      findProduct.subTotal = findProduct.product.price * findProduct.quantity;
      updatedState = {
        ...updatedState,
        checkout: {
          ...updatedState.checkout,
          total: getTotal(updatedState.checkout.products),
          items: getItemsCount(updatedState.checkout.products),
        },
      };
    } else {
      const updatedProducts = updatedState.checkout.products.filter(
        (product) => product !== findProduct
      );
      updatedState = {
        ...updatedState,
        checkout: {
          ...updatedState.checkout,
          products: updatedProducts,
          total: getTotal(updatedProducts),
          items: getItemsCount(updatedProducts),
        },
      };
    }
    return updatedState;
  })
);

const getTotal = (products: Array<CheckoutProduct>) => {
  return products
    .map((product: CheckoutProduct) => Number(product.subTotal))
    .reduce((acc: number, cur: number) => acc + cur, 0);
};

const getItemsCount = (products: Array<CheckoutProduct>) => {
  return products
    .map((product: CheckoutProduct) => Number(product.quantity))
    .reduce((acc: number, cur: number) => acc + cur, 0);
};

export function reducer(state: State = INITIAL_STATE, action: Action) {
  return checkoutReducer(state, action);
}

export const getCheckout = (state: State) => state.checkout;
export const getItems = (state: State) => state.checkout.items;
