import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { ApiService } from '../../api/api.service';
import * as productsActions from '../actions/products';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsEffectsService {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<State>
  ) {}

  productsLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsActions.getProducts),
      mergeMap(() => {
        return this.apiService.getProducts().pipe(
          map((res) => {
            return productsActions.getProductsSuccess({
              payload: { products: res },
            });
          }),
          catchError((error) => of(productsActions.getProductsFail(error)))
        );
      })
    )
  );
}
