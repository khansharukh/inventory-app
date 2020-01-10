import { Component, OnInit } from '@angular/core';
import {InventoryService} from '../../inventory.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private inventoryService: InventoryService, private router: Router) { }

  ngOnInit() {
  }
  pushProducts(pname: string, desc: string, inStock: string) {
    pname = pname.trim();
    desc = desc.trim();
    inStock = inStock.trim();
    if (!pname) { return; }
    if (!desc) { return; }
    const data = {
      name: pname,
      description: desc,
      in_stock: inStock
    };
    this.inventoryService.addProducts(data);
    this.inventoryService.productsUpdate.subscribe(pro => {
      this.router.navigateByUrl('/products');
    });
  }
}
