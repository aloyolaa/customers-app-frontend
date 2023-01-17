import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../core/model/customer.model';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import Sweetalert2 from 'sweetalert2';
import { RegionService } from 'src/app/regions/service/region.service';
import { Region } from 'src/app/core/model/region.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
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
    photo: '',
    region: {
      id: 0,
      name: '',
    },
  };
  regions: Region[] = [];
  errors: string[] = [];

  constructor(
    private customerService: CustomerService,
    private regionService: RegionService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.chargeCustomer();
  }

  chargeCustomer(): void {
    this.activatedRouter.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.customerService.getCustomer(id).subscribe((customer) => {
          this.customer = customer;
          console.log(this.customer);
        });
      }
    });
    this.regionService.getRegions().subscribe((regions) => {
      this.regions = regions;
    });
  }

  create(): void {
    this.customerService.save(this.customer).subscribe({
      next: (customer) => {
        this.router.navigate(['/customers']);
        console.log(customer);
        Sweetalert2.fire({
          icon: 'success',
          title: 'Customer saved successfully',
          text: `Customer ${customer.firstName} has been saved`,
        });
      },
      error: (err) => {
        this.errors = err.error.errors as string[];
        console.log(this.errors);
      },
    });
  }

  update(): void {
    this.customerService.update(this.customer).subscribe({
      next: (customer) => {
        this.router.navigate(['/customers']);
        Sweetalert2.fire({
          icon: 'success',
          title: 'Customer updated successfully',
          text: `Customer ${customer.firstName} has been updated`,
        });
      },
      error: (err) => {
        this.errors = err.error.errors as string[];
      },
    });
  }

  compareRegion(region1: Region, region2: Region): boolean {
    if (region1 === undefined && region2 === undefined) {
      return true;
    }
    return region1 == null || region2 == null
      ? false
      : region1.id === region2.id;
  }
}
