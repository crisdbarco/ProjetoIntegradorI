import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-supplier-listing',
  templateUrl: './supplier-listing.component.html',
  styleUrls: ['./supplier-listing.component.css']
})
export class SupplierListingComponent implements OnInit {
  name: string = ""
  suppliers!: Array<any>
  filteredSuppliers!: Array<any>
  
  constructor(private supplierService: SupplierService) {}
  
  ngOnInit(): void {
    this.suppliers = this.supplierService.getSuppliers()
    this.filterSuppliers()
  }

  filterSuppliers() {
    this.filteredSuppliers = this.suppliers.filter(s => s.name.toLowerCase().includes(this.name.toLowerCase()))
  }

  deleteSupplier(id: number) {
    this.supplierService.delete(id)
    this.filterSuppliers()
  }
}
