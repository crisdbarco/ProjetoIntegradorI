import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { SupplierFormComponent } from './components/supplier-form/supplier-form.component';
import { StockListingComponent } from './components/stock-listing/stock-listing.component';
import { SupplierListingComponent } from './components/supplier-listing/supplier-listing.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    ProductFormComponent,
    SupplierFormComponent,
    StockListingComponent,
    SupplierListingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
