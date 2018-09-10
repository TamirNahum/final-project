import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/services/order.service';
import { UserService } from '../shared/services/user-info.service';
import { OrderList } from '../shared/models/order-list.model';
import { Order } from '../shared/models/order.model';

@Component({
  selector: 'app-my-orders-component',
  templateUrl: './my-orders-component.component.html',
  styleUrls: ['./my-orders-component.component.css']
})
export class MyOrdersComponentComponent implements OnInit {

  localOrderList:OrderList=new OrderList();
  constructor(private myOrderService:OrderService,private myUserService:UserService) { }

  ngOnInit() {
    this.localOrderList.orderList=new Array<Order>();
    
   this.myOrderService.getOrdersByUserId(this.myUserService.userList.singleUser.UserId).then(()=>this.localOrderList=this.myOrderService.orderList);
   
  }

}
