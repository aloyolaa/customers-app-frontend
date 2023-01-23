import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/core/model/customer.model';
import { CustomerService } from '../../service/customer.service';
import Sweetalert2 from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { Invoice } from 'src/app/core/model/invoice.mode';
import { InvoiceService } from 'src/app/invoices/service/invoice.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  title = 'Customer Detail';
  customer: Customer = new Customer();
  photoSelected!: File;
  progress: number = 0;

  constructor(
    private customerService: CustomerService,
    private invoiceService: InvoiceService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let id: number = Number(params.get('id'));
      if (id) {
        this.customerService.getCustomer(id).subscribe((customer) => {
          this.customer = customer;
        });
      }
    });
  }

  selectPhoto(event: any) {
    this.photoSelected = event.target.files[0];
    this.progress = 0;
    if (this.photoSelected.type.indexOf('image') < 0) {
      Sweetalert2.fire({
        icon: 'error',
        title: 'Seleccionar imagen',
        text: `El archivo seleccionado debe ser una imagen`,
      });
    }
  }

  uploadPhoto() {
    if (!this.photoSelected) {
      Sweetalert2.fire({
        icon: 'error',
        title: 'Debe seleccionar una foto',
        text: `Se necesita una foto para guardar`,
      });
    } else {
      this.customerService
        .uploadPhoto(this.photoSelected, this.customer.id.toString())
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = event.total
              ? Math.round((100 * event.loaded) / event.total)
              : 0;
          } else if (event.type === HttpEventType.Response) {
            let response = event.body;
            this.customer = response as Customer;
            Sweetalert2.fire({
              icon: 'success',
              title: 'Foto subida con éxito',
              text: `La foto ${this.customer.photo} se subió correctamente`,
            });
          }
        });
    }
  }

  delete(invoice: Invoice): void {
    const withBootstrapButtons = Sweetalert2.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    withBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: `Invoice will be deleted`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.invoiceService.delete(invoice.id).subscribe((response) => {
            console.log(response);
            if (response) {
              const index = this.customer.invoices.findIndex(
                (i) => i.id === invoice.id
              );
              this.customer.invoices.splice(index, 1);
              withBootstrapButtons.fire(
                'Invoice deleted successfully',
                `Invoice ${invoice.description} has been deleted.`,
                'success'
              );
            }
          });
        }
      });
  }
}
