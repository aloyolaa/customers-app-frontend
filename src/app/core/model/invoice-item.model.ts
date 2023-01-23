import { Product } from './product.model';

export class InvoiceItem {
  quantity: number = 1;
  product: Product;
  amount: number;

  calculateAmount(): number {
    return this.quantity * this.product.price;
  }
}
