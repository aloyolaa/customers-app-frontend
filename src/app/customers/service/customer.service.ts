import {Injectable} from '@angular/core';
import {Customer} from "../../core/model/customer.model";
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import Sweetalert2 from "sweetalert2";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient, private router: Router) {
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.url}/`);
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.url}/${id}`)
      .pipe(
        catchError(e => {
          this.router.navigate(['/customers']);
          Sweetalert2.fire({
            icon: 'error',
            title: `${e.error.title}`,
            text: `${e.error.detail}`
          });
          return throwError(() => e);
        })
      );
  }

  save(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.url}/save`, customer)
      .pipe(
        catchError(e => {
          if (e.error.status == 400) {
            return throwError(() => e);
          }
          Sweetalert2.fire({
            icon: 'error',
            title: `${e.error.title}`,
            text: `${e.error.detail}`
          });
          return throwError(() => e);
        })
      );
  }

  update(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.url}/update/${customer.id}`, customer)
      .pipe(
        catchError(e => {
          if (e.error.status == 400) {
            return throwError(() => e);
          }
          Sweetalert2.fire({
            icon: 'error',
            title: `${e.error.title}`,
            text: `${e.error.detail}`
          });
          return throwError(() => e);
        })
      );
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/delete/${id}`)
      .pipe(
        catchError(e => {
          Sweetalert2.fire({
            icon: 'error',
            title: `${e.error.title}`,
            text: `${e.error.detail}`
          });
          return throwError(() => e);
        })
      );
  }
}
