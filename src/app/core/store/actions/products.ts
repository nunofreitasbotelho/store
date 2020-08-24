import { createAction, props } from '@ngrx/store';
import { Products } from '../../../shared';

export const getProducts = createAction('[Products] Get Products');

export const getProductsSuccess = createAction(
  '[Products] Get Products Success',
  props<{ payload: { products: Products } }>()
);

export const getProductsFail = createAction(
  '[Products] Get Products Fail',
  props<{ payload: any }>()
);
