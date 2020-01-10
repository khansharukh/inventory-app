import {Component, OnDestroy, OnInit} from '@angular/core';
import {InventoryService} from '../../inventory.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {
  private proUnsub: Subscription;
  private routeSub: Subscription;
  private product = [
    {name: ''},
    {id: ''},
    {description: ''},
    {in_stock: ''},
    {created_at: ''}
  ];

  constructor(private inventoryService: InventoryService, private route: ActivatedRoute) {
    console.log('First');
    this.routeSub = this.route.params.subscribe(params => {
      const pid = params.id;
      this.inventoryService.getSingleProducts(pid);
    });
  }

  ngOnInit() {
    console.log('Second');
    this.proUnsub = this.inventoryService.productsUpdate.subscribe(pro => {
      this.product = pro[0];
    });
  }

  ngOnDestroy(): void {
    this.proUnsub.unsubscribe();
    this.routeSub.unsubscribe();
  }

}
