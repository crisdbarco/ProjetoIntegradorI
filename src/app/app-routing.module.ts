import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierFormComponent } from './components/supplier-form/supplier-form.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { StockListingComponent } from './components/stock-listing/stock-listing.component';
import { SupplierListingComponent } from './components/supplier-listing/supplier-listing.component';

const routes: Routes = [
  {path: 'cadastro-fornecedor', component:SupplierFormComponent},
  {path: 'cadastro-produto', component:ProductFormComponent},
  {path: 'estoque', component:StockListingComponent},
  {path: 'fornecedores', component:SupplierListingComponent},
  {path: '**', redirectTo: 'estoque', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
