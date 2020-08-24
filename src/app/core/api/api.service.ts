import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModelMapperService } from '../mappers/model-mapper.service';
import { Products } from 'src/app/shared';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://5ee744ce52bb0500161fd6e4.mockapi.io/';
  constructor(
    private httpClient: HttpClient,
    private modelMapperService: ModelMapperService
  ) {}

  getProducts(): Observable<Products> {
    const endpoint = 'products';
    const endpointUrl = `${this.apiUrl}${endpoint}`;

    return this.httpClient
      .get(endpointUrl)
      .pipe(
        map((payload: any) => this.modelMapperService.mapProducts(payload))
      );
  }
}
