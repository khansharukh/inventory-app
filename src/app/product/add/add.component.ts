import { Component, OnInit } from '@angular/core';
import {InventoryService} from '../../inventory.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  private user;
  constructor(private inventoryService: InventoryService, private router: Router) {
    this.user = JSON.parse(localStorage.getItem('user_auth'));
    if (!this.user) {
      this.router.navigateByUrl('');
    }
  }

  ngOnInit() {
  }
  pushProducts(pname: string, desc: string, inStock: string) {
    const userId = this.user[0].id;
    pname = pname.trim();
    desc = desc.trim();
    inStock = inStock.trim();
    if (!pname) { return; }
    if (!desc) { return; }
    if (!userId) { return; }
    const data = {
      name: pname,
      description: desc,
      in_stock: inStock,
      user_id: userId
    };
    this.inventoryService.addProducts(data);
    this.inventoryService.productsUpdate.subscribe(pro => {
      this.router.navigateByUrl('/products');
    });
  }
}
