import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/services/order.service';
import { OrderList } from '../shared/models/order-list.model';
import { Order } from '../shared/models/order.model';
import { pipe } from 'rxjs';
import { DatePipe } from '@angular/common';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-return-car-component',
  templateUrl: './return-car-component.component.html',
  styleUrls: ['./return-car-component.component.css']
})
export class ReturnCarComponentComponent implements OnInit {

  orderList:OrderList=new OrderList();
  carNumber:string;
  private pipe = new DatePipe("en-US");
  constructor(private myOrderService:OrderService,private alertService: AlertService) { }

  ngOnInit() {
    this.orderList.orderList=new Array<Order>();
  }

  onSubmit(){
    //debugger;
    this.myOrderService.getOrderByCarNumber(this.carNumber).then(()=>this.orderList=this.myOrderService.orderList);
  }

  returnCar(order:Order){
    let callback = (bool: boolean) => { (bool) ? "action success" : "action fail"; }

    order.ReturnDate=new Date(this.pipe.transform(new Date()));
    this.myOrderService.editOrder(order,order.OrderId).subscribe(()=>this.orderList=this.myOrderService.orderList,()=> this.alertService.error("error"));
    this.myOrderService.setTotalPrice();
  }

}
