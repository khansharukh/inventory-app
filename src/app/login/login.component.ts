import { Component, OnInit } from '@angular/core';
import {InventoryService} from '../inventory.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private inventoryService: InventoryService, private router: Router) {
    const user = JSON.parse(localStorage.getItem('user_auth'));
    if (user) {
      this.router.navigateByUrl('/products');
    }
  }

  ngOnInit() {
  }

  authUser(email, pass) {
    email = email.trim();
    pass = pass.trim();
    if (!email) { return; }
    if (!pass) { return; }
    const data = {
      ip_email: email,
      ip_pass: pass
    };
    this.inventoryService.authUser(data);
    this.inventoryService.userUpdate.subscribe(pro => {
      this.router.navigateByUrl('/products');
    });
  }
}
