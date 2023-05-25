import { Injectable } from '@angular/core';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  suppliers: Array<any>
  nextSupplierId: number
  
  constructor(private productService: ProductService) { 
    const suppliers = localStorage.getItem('suppliers')
    this.suppliers = suppliers ? JSON.parse(suppliers) : []
    
    const nextSupplierId = localStorage.getItem('nextSupplierId')
    this.nextSupplierId = nextSupplierId ? JSON.parse(nextSupplierId) : 1
  }
  
  getSuppliers() {
    return this.suppliers
  }
  
  save(supplier: { id: number | undefined; name: string; telephone: string; email: string; }) {
    if (supplier.id === undefined) {
      supplier.id = this.nextSupplierId++
      this.persist('nextSupplierId', this.nextSupplierId)
      this.suppliers.push(supplier)
    } else {
      this.suppliers[this.suppliers.findIndex(s => s.id == supplier.id)] = supplier
      this.productService.editSupplier(supplier)
    }
    this.persist('suppliers', this.suppliers)
  }

  persist(localKey: string, value: any) {
    localStorage.setItem(localKey, JSON.stringify(value))
  }

  delete(id: number) {
    if (confirm('Deseja realmente excluir o fornecedor?')) {
      this.suppliers.splice(this.suppliers.findIndex(s => s.id == id), 1)
      this.persist('suppliers', this.suppliers)
      this.productService.deleteSupplier(id)
      alert('Operação realizada com sucesso.')
    } else alert('Exclusão cancelada.')
  }
}
