import { Customer } from './customer.model';
import { InvoiceItem } from './invoice-item.model';

export class Invoice {
  id: number;
  description: string;
  observation: string;
  createDate: string;
  customer: Customer;
  invoiceItems: InvoiceItem[] = [];
  total: number;

  calculateTotal(): number {
    this.total = 0;
    this.invoiceItems.forEach(
      (item: InvoiceItem) => (this.total += item.calculateAmount())
    );
    return this.total;
  }
}
