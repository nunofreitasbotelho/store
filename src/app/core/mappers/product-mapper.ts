import { ModelMapper } from './model-mapper';
import { Product } from 'src/app/shared';

export class ProductMapper implements ModelMapper<Product> {
  getDto(entity: Product): any {
    return {};
  }

  getModel(dto: any): Product {
    return {
      id: Number(dto.id),
      name: dto.name,
      price: Number(dto.price),
      photo: dto.photo,
    };
  }
}
