import {Component, OnInit} from '@angular/core';
import {Customer} from "../../../core/model/customer.model";
import {CustomerService} from "../../service/customer.service";
import Sweetalert2 from "sweetalert2";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  paginator: any;

  constructor(private customerService: CustomerService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe(params => {
        let page = Number(params.get('page'));
        if (!page) {
          page = 0;
        }
        this.customerService.getCustomersByPage(page)
          .subscribe(
            response => {
              this.customers = response.content as Customer[];
              this.paginator = response;
            }
          )
      });
  }

  delete(customer: Customer): void {
    const withBootstrapButtons = Sweetalert2.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    withBootstrapButtons.fire({
      title: 'Are you sure?',
      text: `Customer ${customer.firstName} will be deleted`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.delete(customer.id)
          .subscribe(
            response => {
              console.log(response)
              if (response) {
                const index = this.customers.findIndex(c => c.id === customer.id);
                this.customers.splice(index, 1);
                withBootstrapButtons.fire(
                  'Customer deleted successfully',
                  `Customer ${customer.firstName} has been deleted.`,
                  'success'
                )
              }
            }
          )
      }
    })
  }
}
