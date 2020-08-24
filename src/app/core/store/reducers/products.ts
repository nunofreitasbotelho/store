import { createReducer, on, Action } from '@ngrx/store';
import { Products } from '../../../shared';
import * as productActions from '../actions/products';

const INITIAL_STATE: State = {
  products: [],
};

export interface State {
  products: Products;
}

const productsReducer = createReducer(
  INITIAL_STATE,
  on(productActions.getProductsSuccess, (state, { payload }) => {
    return {
      ...state,
      products: payload?.products ? payload.products : state.products,
    };
  })
);

export function reducer(state: State = INITIAL_STATE, action: Action) {
  return productsReducer(state, action);
}

export const getProducts = (state: State) => state.products;
