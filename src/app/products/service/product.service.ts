import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:8080/api/v1/products';

  constructor(private http: HttpClient) { }

  getProductsByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/byName/${name}`)
  }
}
