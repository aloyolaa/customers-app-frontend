import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap, Observable } from 'rxjs';
import { Invoice } from 'src/app/core/model/invoice.mode';
import { CustomerService } from 'src/app/customers/service/customer.service';
import { InvoiceService } from '../../service/invoice.service';
import Sweetalert2 from 'sweetalert2';
import { ProductService } from 'src/app/products/service/product.service';
import { Product } from 'src/app/core/model/product.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { InvoiceItem } from 'src/app/core/model/invoice-item.model';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css'],
})
export class InvoiceFormComponent implements OnInit {
  title: string = 'Invoice Form';
  invoice: Invoice = new Invoice();
  errors: string[] = [];
  autocompleteControl = new FormControl('');
  filteredProducts: Observable<Product[]>;

  constructor(
    private customerService: CustomerService,
    private invoiceService: InvoiceService,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let id: number = Number(params.get('customer_id'));
      this.customerService.getCustomer(id).subscribe((customer) => {
        this.invoice.customer = customer;
      });
    });
    this.filteredProducts = this.autocompleteControl.valueChanges.pipe(
      map((value) => (typeof value === 'string' ? value : '')),
      mergeMap((value) => (value ? this._filter(value || '') : []))
    );
  }

  private _filter(value: string): Observable<Product[]> {
    const filterValue = value.toLowerCase();
    return this.productService.getProductsByName(filterValue);
  }

  create(): void {
    console.log(this.invoice);
    this.invoiceService.save(this.invoice).subscribe({
      next: (invoice) => {
        this.router.navigate(['/customers']);
        console.log(invoice);
        Sweetalert2.fire({
          icon: 'success',
          title: 'Invoice saved successfully',
          text: `Invoice ${invoice.description} has been saved`,
        });
      },
      error: (err) => {
        this.errors = err.error.errors as Array<string>;
        console.log(this.errors);
      },
    });
  }

  byName(product?: Product): string {
    return product ? product.name : '';
  }

  selectProduct(event: MatAutocompleteSelectedEvent): void {
    let product = event.option.value as Product;
    console.log(product);
    if (this.existItem(product.id)) {
      this.increaseQuantity(product.id);
    } else {
      let item = new InvoiceItem();
      item.product = product;
      this.invoice.invoiceItems.push(item);
      this.autocompleteControl.setValue('');
      event.option.focus();
      event.option.deselect();
    }
  }

  updateQuantity(id: number, event: any): void {
    let quantity = event.target.value as number;
    if (quantity == 0) {
      return this.deleteInvoiceItem(id);
    }
    this.invoice.invoiceItems = this.invoice.invoiceItems.map(
      (item: InvoiceItem) => {
        if (id === item.product.id) {
          item.quantity = quantity;
        }
        return item;
      }
    );
  }

  existItem(id: number): boolean {
    let exist = false;
    this.invoice.invoiceItems.forEach((item: InvoiceItem) => {
      if (id === item.product.id) {
        exist = true;
      }
    });
    return exist;
  }

  increaseQuantity(id: number): void {
    this.invoice.invoiceItems = this.invoice.invoiceItems.map(
      (item: InvoiceItem) => {
        if (id === item.product.id) {
          ++item.quantity;
        }
        return item;
      }
    );
  }

  deleteInvoiceItem(id: number): void {
    this.invoice.invoiceItems = this.invoice.invoiceItems.filter(
      (item: InvoiceItem) => id !== item.product.id
    );
  }
}
