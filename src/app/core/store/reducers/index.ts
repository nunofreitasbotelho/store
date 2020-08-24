import {
  ActionReducerMap,
  ActionReducer,
  MetaReducer,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromProducts from './products';
import * as fromCheckout from './checkout';

export interface State {
  products: fromProducts.State;
  checkout: fromCheckout.State;
}

export const reducers: ActionReducerMap<State> = {
  products: fromProducts.reducer,
  checkout: fromCheckout.reducer,
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state: State, action: any): State {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [logger];

const getProductsState = createFeatureSelector<fromProducts.State>('products');
const getCheckoutState = createFeatureSelector<fromCheckout.State>('checkout');

export const ProductsState = {
  products: createSelector(getProductsState, fromProducts.getProducts),
};

export const CheckoutState = {
  checkout: createSelector(getCheckoutState, fromCheckout.getCheckout),
  items: createSelector(getCheckoutState, fromCheckout.getItems),
};
