import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  id: number | undefined
  productName: string = ""
  productStock: number = 0
  unitOfMeasure: string = ""
  stockThreshold: number = 0
  
  operation: string = "create"
  productSupplierId: number | undefined
  productSupplier!: any[]

  suppliers!: any[]
  products!: any[]

  constructor(private productService: ProductService, private supplierService: SupplierService) {}
  
  ngOnInit(): void {
    this.suppliers = this.supplierService.getSuppliers()
    this.products = this.productService.getProducts()
  }

  registerProduct(form: NgForm) {
    if (this.id === undefined) {
      this.productSupplier = [this.suppliers.find(s => s.id == this.productSupplierId)]
    }

    const product = {
      id:this.id,
      name:this.productName,
      stock:this.productStock,
      unit:this.unitOfMeasure,
      threshold:this.stockThreshold,
      suppliers: this.productSupplier
    }
    
    this.productService.save(product)

    alert('Operação realizada com sucesso.')

    form.resetForm()

    this.products = this.productService.getProducts()
  }

  undefineId() {
    if (this.operation == "create")
      this.id = undefined
  }

  loadFields(form: NgForm) {
    if (this.id === undefined) {
      form.resetForm()
      return
    }
    const product = this.products[this.products.findIndex((p: { id: number | undefined; }) => p.id == this.id)]

    this.productName = product.name
    this.productStock = product.stock
    this.unitOfMeasure = product.unit
    this.stockThreshold = product.threshold
    this.productSupplier = product.suppliers
  }
}
