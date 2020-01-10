import {Component, OnDestroy, OnInit} from '@angular/core';
import {InventoryService} from '../inventory.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  private proUnsub: Subscription;
  private products = [];

  constructor(private inventoryService: InventoryService) {
    this.inventoryService.getProducts();
    /*this.products = this.inventoryService.productList;
    console.log(this.products);*/
  }

  ngOnInit() {
    this.proUnsub = this.inventoryService.productsUpdate.subscribe(pro => {
      this.products = pro;
    });
  }


  showAlert(id: string) {
    alert(id);
  }

  ngOnDestroy(): void {
    this.proUnsub.unsubscribe();
  }
}
