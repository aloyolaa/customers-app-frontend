import { Injectable } from '@angular/core';
import { Customer } from '../../core/model/customer.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import Sweetalert2 from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private url = 'http://localhost:8080/api/v1/customers';

  constructor(private http: HttpClient, private router: Router) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get(`${this.url}/`).pipe(
      map((response) => {
        let customers = response as Customer[];
        return customers.map((customer) => {
          customer.firstName = customer.firstName.toUpperCase();
          //customer.birthDate = formatDate(customer.birthDate, 'EEEE dd, MMMM ,yyyy', 'en-US');
          //customer.createDate = formatDate(customer.createDate, 'dd-MM-yyyy HH:mm:ss', 'en-US');
          return customer;
        });
      })
    );
  }

  getCustomersByPage(page: number): Observable<any> {
    return this.http.get(`${this.url}/page/${page}`).pipe(
      map((response: any) => {
        (response.content as Customer[]).forEach((customer) => {
          customer.firstName = customer.firstName.toUpperCase();
          return customer;
        });
        return response;
      })
    );
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.url}/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/customers']);
        Sweetalert2.fire({
          icon: 'error',
          title: `${e.error.title}`,
          text: `${e.error.detail}`,
        });
        return throwError(() => e);
      })
    );
  }

  save(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.url}/save`, customer).pipe(
      catchError((e) => {
        if (e.error.status == 400) {
          return throwError(() => e);
        }
        Sweetalert2.fire({
          icon: 'error',
          title: `${e.error.title}`,
          text: `${e.error.detail}`,
        });
        return throwError(() => e);
      })
    );
  }

  update(customer: Customer): Observable<Customer> {
    return this.http
      .put<Customer>(`${this.url}/update/${customer.id}`, customer)
      .pipe(
        catchError((e) => {
          if (e.error.status == 400) {
            return throwError(() => e);
          }
          Sweetalert2.fire({
            icon: 'error',
            title: `${e.error.title}`,
            text: `${e.error.detail}`,
          });
          return throwError(() => e);
        })
      );
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/delete/${id}`).pipe(
      catchError((e) => {
        Sweetalert2.fire({
          icon: 'error',
          title: `${e.error.title}`,
          text: `${e.error.detail}`,
        });
        return throwError(() => e);
      })
    );
  }

  uploadPhoto(photo: File, id: string): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('file', photo);
    formData.append('id', id);
    const req = new HttpRequest('POST', `${this.url}/upload`, formData, {
      reportProgress: true,
    });
    return this.http.request(req);
  }
}
