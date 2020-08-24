import { Product } from './product.model';

/**
 * Checkout representation.
 *
 * @export
 * @interface Checkout
 */

export interface CheckoutProduct {
  product: Product;
  subTotal: number;
  quantity: number;
}
export interface Checkout {
  readonly products: Array<CheckoutProduct>;
  readonly total: number;
  readonly items: number;
}
