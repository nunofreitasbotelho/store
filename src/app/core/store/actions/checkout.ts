import { createAction, props } from '@ngrx/store';
import { Product } from '../../../shared';

export const addToCart = createAction(
  '[Checkout] Add product to cart',
  props<{ payload: { product: Product } }>()
);

export const removeFromCart = createAction(
  '[Checkout] Remove products from cart',
  props<{ payload: { productId: number; quantity?: number } }>()
);
