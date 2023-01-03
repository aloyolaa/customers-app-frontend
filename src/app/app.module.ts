import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {DirectiveComponent} from './directive/directive.component';
import {CustomersComponent} from './customers/customers.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: '', redirectTo: '/customers', pathMatch: 'full'},
  {path: 'directives', component: DirectiveComponent},
  {path: 'customers', component: CustomersComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectiveComponent,
    CustomersComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
