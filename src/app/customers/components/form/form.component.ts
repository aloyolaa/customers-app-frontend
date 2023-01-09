import {Component, OnInit} from '@angular/core';
import {Customer} from "../../../core/model/customer.model";
import {CustomerService} from "../../service/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import Sweetalert2 from "sweetalert2";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  title = 'CustomerModel Form';
  customer: Customer = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    createDate: '',
  };
  errors: string[] = [];

  constructor(private customerService: CustomerService, private router: Router, private activatedRouter: ActivatedRoute) {
  }

  ngOnInit() {
    this.chargeCustomer();
  }

  chargeCustomer(): void {
    this.activatedRouter.params
      .subscribe(
        params => {
          let id = params['id']
          if (id) {
            this.customerService.getCustomer(id)
              .subscribe(
                customer => this.customer = customer
              )
          }
        }
      )
  }

  create(): void {
    this.customerService.save(this.customer)
      .subscribe({
        next: customer => {
          this.router.navigate(['/customers'])
          Sweetalert2.fire({
            icon: 'success',
            title: 'Customer saved successfully',
            text: `Customer ${customer.firstName} has been saved`
          })
        },
        error: err => {
          this.errors = err.error.errors as string[]
          console.log(this.errors)
        }
      });
  }

  update(): void {
    this.customerService.update(this.customer)
      .subscribe({
        next: customer => {
          this.router.navigate(['/customers'])
          Sweetalert2.fire({
            icon: 'success',
            title: 'Customer updated successfully',
            text: `Customer ${customer.firstName} has been updated`
          })
        },
        error: err => {
          this.errors = err.error.errors as string[]
        }
      });
  }
}
