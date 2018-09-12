import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/services/order.service';
import { OrderList } from '../shared/models/order-list.model';
import { Router } from '@angular/router';
import { AlertService } from '../shared/services/alert.service';
import { UserService } from '../shared/services/user-info.service';

@Component({
  selector: 'app-manage-orders-component',
  templateUrl: './manage-orders-component.component.html',
  styleUrls: ['./manage-orders-component.component.css']
})
export class ManageOrdersComponentComponent implements OnInit {
private orderList:OrderList=new OrderList();
loading = false;

  constructor(private myOrderService: OrderService,private myUserService:UserService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    if(this.myUserService.userList.singleUser.UserRole!=1){
      this.router.navigate(['/Home']);
      return;

    }
    this.myOrderService.getAllOrders().then(()=>this.orderList=this.myOrderService.orderList).catch(()=>{console.log("not a manager failed")});

  }

  onEdit(orderId:number){
    this.myOrderService.getOrderByOrderId(orderId).then(()=>this.router.navigate(['../Edit-Order']));
  }

  onDelete(orderId:number){
    this.loading=true;
    document.documentElement.scrollTop = 0;
    this.myOrderService.deleteOrder(orderId).subscribe(
      data => {
      this.alertService.success('deleted successfuly');
      this.myOrderService.getAllOrders().then(()=>this.orderList=this.myOrderService.orderList);
      this.loading = false;


    },
    error => {
      this.alertService.error("error");
      this.loading = false;

    });

  }

}
