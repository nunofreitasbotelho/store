import { Injectable } from '@angular/core';
import { ModelMapper } from './model-mapper';
import { ProductMapper } from './product-mapper';
import { Product, Products } from 'src/app/shared';

@Injectable({
  providedIn: 'root',
})
export class ModelMapperService {
  private readonly productMapper: ModelMapper<Product>;

  constructor() {
    this.productMapper = new ProductMapper();
  }

  mapProduct(payload: any): Product {
    return this.productMapper.getModel(payload);
  }

  mapProducts(payload: any): Products {
    return this.mapCollectionHelper(payload, (dto: any) =>
      this.productMapper.getModel(dto)
    );
  }

  private mapCollectionHelper<T, K>(payload: K[], fn: (value: K) => T): T[] {
    const out: T[] = [];

    if (payload) {
      payload.forEach((b) => {
        const elem = fn(b);
        out.push(elem);
      });
    }
    return out;
  }
}
