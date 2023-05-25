import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-stock-listing',
  templateUrl: './stock-listing.component.html',
  styleUrls: ['./stock-listing.component.css']
})
export class StockListingComponent implements OnInit {
  productName: string = ""
  supplierName: string = ""
  products!: Array<any>
  suppliers!: Array<any>
  filteredProducts!: Array<any>
  critical: string = 'any'

  constructor(private productService: ProductService, private supplierService: SupplierService) {}
  
  ngOnInit(): void {
    this.products = this.productService.getProducts()
    this.suppliers = this.supplierService.getSuppliers()
    this.filterProducts()
  }
  
  filterProducts() {
    this.filteredProducts =
     this.products.filter(
      p => p.name.toLowerCase().includes(this.productName.toLowerCase())
        && (this.supplierName ? p.suppliers.some(
          (s: { name: string }) => s.name.toLowerCase().includes(this.supplierName.toLowerCase())) : true)
        && (this.critical == 'any' ? true : p.stock <= p.threshold))
  }

  deleteProduct(id: number) {
    this.productService.delete(id)
    this.filterProducts()
  }

  addSupplier(product: { id: number | undefined; name: string; stock: number; unit: string; threshold: number; suppliers: any[]; }) {
    const supplierId = prompt("Digite o código do fornecedor:", "123")

    const supplierIndex = this.suppliers.findIndex(s => s.id == supplierId)
    
    if (supplierIndex == -1)
      return alert("Código não existente.")

    if (product.suppliers.some(s => s.id == supplierId))
      return alert(product.name + " já tem esse fornecedor cadastrado.")

    product.suppliers.unshift(this.suppliers[supplierIndex])
    this.productService.save(product)
    alert("Operação realizada com sucesso.")
  }

  removeSupplier(product: { id: number | undefined; name: string; stock: number; unit: string; threshold: number; suppliers: any[]; }, supplier: any) {
    product.suppliers.splice(product.suppliers.indexOf(supplier), 1)
    this.productService.save(product)
  }
}
