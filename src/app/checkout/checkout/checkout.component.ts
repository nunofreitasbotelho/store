import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Checkout, Product } from 'src/app/shared';
import { Store, select } from '@ngrx/store';
import { State, CheckoutState } from 'src/app/core/store/reducers';
import { addToCart, removeFromCart } from 'src/app/core/store/actions/checkout';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkout$: Observable<Checkout>;

  constructor(private store: Store<State>) {
    this.queryState();
  }

  ngOnInit(): void {}

  protected queryState(): void {
    this.checkout$ = this.store.pipe(select(CheckoutState.checkout));
  }

  updateQuantity(productToUpdate: Product, removing: boolean): void {
    removing
      ? this.store.dispatch(
          removeFromCart({
            payload: { productId: productToUpdate.id, quantity: 1 },
          })
        )
      : this.store.dispatch(
          addToCart({ payload: { product: productToUpdate } })
        );
  }

  removeProduct(productToRemove: Product): void {
    this.store.dispatch(
      removeFromCart({
        payload: { productId: productToRemove.id },
      })
    );
  }
}
