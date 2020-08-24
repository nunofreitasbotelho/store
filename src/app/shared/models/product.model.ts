/**
 * Product representation.
 *
 * @export
 * @interface Product
 */
export interface Product {
  readonly id: number;
  readonly name: string;
  readonly price: number;
  readonly photo: string;
}

export type Products = Product[] | Array<Product>;
