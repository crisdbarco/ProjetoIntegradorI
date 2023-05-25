import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css']
})
export class SupplierFormComponent implements OnInit {
  id: number | undefined
  supplierName: string = ""
  supplierTelephone: string = ""
  supplierEmail: string = ""
  
  operation: string = "create"
  
  suppliers: any

  constructor(private service: SupplierService) {}

  ngOnInit(): void {
    this.suppliers = this.service.getSuppliers()
  }

  registerSupplier(form: NgForm) {
    const supplier = {
      id: this.id,
      name: this.supplierName,
      telephone: this.supplierTelephone,
      email: this.supplierEmail
    }

    this.service.save(supplier)

    alert('Operação realizada com sucesso.')

    form.resetForm()

    this.suppliers = this.service.getSuppliers()
  }

  undefineId() {
    if (this.operation == "create")
      this.id = undefined
  }

  loadFields(form: NgForm) {
    if (this.id == undefined) {
      form.resetForm()
      return
    }
    const supplier = this.suppliers[this.suppliers.findIndex((s: { id: number | undefined; }) => s.id == this.id)]

    this.supplierName = supplier.name
    this.supplierTelephone = supplier.telephone
    this.supplierEmail = supplier.email
  }
}
