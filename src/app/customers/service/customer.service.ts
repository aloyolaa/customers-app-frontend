import {Injectable} from '@angular/core';
import {Customer} from "../../core/model/customer.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient) {
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.url}/`);
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.url}/${id}`);
  }

  save(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.url}/save`, customer);
  }

  update(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.url}/update/${customer.id}`, customer);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/delete/${id}`);
  }
}
