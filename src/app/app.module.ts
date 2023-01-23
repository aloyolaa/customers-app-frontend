import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectiveComponent } from './directive/directive.component';
import { CustomersComponent } from './customers/components/customers/customers.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './customers/components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from './paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DetailComponent } from './customers/components/detail/detail.component';
import { InvoiceDetailComponent } from './invoices/components/invoice-detail/invoice-detail.component';
import { InvoiceFormComponent } from './invoices/components/invoice-form/invoice-form.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
  { path: 'directives', component: DirectiveComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'customers/page/:page', component: CustomersComponent },
  { path: 'customers/form', component: FormComponent },
  { path: 'customers/form/:id', component: FormComponent },
  { path: 'customers/detail/:id', component: DetailComponent },
  { path: 'invoices/detail/:id', component: InvoiceDetailComponent },
  { path: 'invoices/form/:customer_id', component: InvoiceFormComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectiveComponent,
    CustomersComponent,
    FormComponent,
    PaginatorComponent,
    DetailComponent,
    InvoiceDetailComponent,
    InvoiceFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
