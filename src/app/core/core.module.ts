import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ModelMapperService } from './mappers/model-mapper.service';
import { reducers, metaReducers } from './store/reducers';
import { ProductsEffectsService } from './store/effects/products-effects.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot([ProductsEffectsService]),
    StoreDevtoolsModule.instrument({ maxAge: 25, name: 'KK Store' }),
  ],
  providers: [ModelMapperService],
})
export class CoreModule {}
