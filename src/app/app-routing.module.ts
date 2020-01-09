import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductComponent} from './product/product.component';
import {LoginComponent} from './login/login.component';
import {AddComponent} from './product/add/add.component';
import {ViewComponent} from './product/view/view.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'products', component: ProductComponent},
  { path: 'product/add', component: AddComponent},
  { path: 'product/view', component: ViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
