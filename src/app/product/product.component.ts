import {Component, OnDestroy, OnInit} from '@angular/core';
import {InventoryService} from '../inventory.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  private proUnsub: Subscription;
  private products = [];

  constructor(private inventoryService: InventoryService, private router: Router) {
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
    this.router.navigateByUrl('/product/view/' + id);
  }

  ngOnDestroy(): void {
    this.proUnsub.unsubscribe();
  }
}
