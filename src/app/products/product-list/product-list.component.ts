import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Products, Product, Checkout } from 'src/app/shared';
import { Store, select } from '@ngrx/store';
import {
  State,
  ProductsState,
  CheckoutState,
} from 'src/app/core/store/reducers';
import { getProducts } from 'src/app/core/store/actions/products';
import { takeUntil } from 'rxjs/operators';
import { addToCart } from 'src/app/core/store/actions/checkout';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products$: Observable<Products>;
  items$: Observable<number>;

  showNotification: boolean;

  private destroy$: Subject<void> = new Subject();

  constructor(private store: Store<State>) {
    this.queryState();
  }

  ngOnInit(): void {
    this.store.dispatch(getProducts());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  addToCart(productToAdd: Product): void {
    this.store.dispatch(addToCart({ payload: { product: productToAdd } }));
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }

  protected queryState(): void {
    this.products$ = this.store.pipe(select(ProductsState.products));
    this.items$ = this.store.pipe(select(CheckoutState.items));
  }
}
