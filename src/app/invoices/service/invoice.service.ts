import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Invoice } from 'src/app/core/model/invoice.mode';
import Sweetalert2 from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private url = 'http://localhost:8080/api/v1/invoices';

  constructor(private http: HttpClient) {}

  getInvoice(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.url}/${id}`);
  }

  save(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.url}/save`, invoice);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/delete/${id}`);
  }
}
