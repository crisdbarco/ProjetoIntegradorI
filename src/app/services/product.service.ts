import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Array<{ id: number | undefined; name: string; stock: number; unit: string; threshold: number; suppliers: any[]; }>
  nextProductId: number
  
  constructor() {
    const products = localStorage.getItem('products')
    this.products = products ? JSON.parse(products) : []
    
    const nextProductId = localStorage.getItem('nextProductId')
    this.nextProductId = nextProductId ? JSON.parse(nextProductId) : 1
  }
  
  getProducts() {
    return this.products
  }
  
  save(product: { id: number | undefined; name: string; stock: number; unit: string; threshold: number; suppliers: any[]; }) {
    if (product.id === undefined) {
      product.id = this.nextProductId++
      this.persist('nextProductId', this.nextProductId)
      this.products.push(product)
    } else {
      this.products[this.products.findIndex(p => p.id == product.id)] = product
    }
    this.persist('products', this.products)
  }

  editSupplier(supplier: { id: number | undefined; name: string; telephone: string; email: string; }) {
    for (let product of this.products) {
      const supplierIndex = product.suppliers.findIndex(s => s.id == supplier.id)
      if (supplierIndex == -1)
       continue;
      product.suppliers[supplierIndex] = supplier
    }
    this.persist('products', this.products)
  }
  
  persist(localKey: string, value: any) {
    localStorage.setItem(localKey, JSON.stringify(value))
  }

  delete(id: number) {
    if (confirm('Deseja realmente excluir o produto?')) {
      this.products.splice(this.products.findIndex(p => p.id == id), 1)
      this.persist('products', this.products)
      alert('Operação realizada com sucesso.')
    } else alert('Exclusão cancelada.')
  }

  deleteSupplier(supplierId: number) {
    for (let product of this.products) {
      const supplierIndex = product.suppliers.findIndex(s => s.id == supplierId)
      if (supplierIndex == -1)
       continue;
      product.suppliers.splice(supplierIndex, 1)
    }
    this.persist('products', this.products)
  }
}
