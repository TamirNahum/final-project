import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/services/order.service';
import { OrderList } from '../shared/models/order-list.model';
import { Order } from '../shared/models/order.model';
import { pipe } from 'rxjs';
import { DatePipe } from '@angular/common';
import { AlertService } from '../shared/services/alert.service';
import { UserService } from '../shared/services/user-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-return-car-component',
  templateUrl: './return-car-component.component.html',
  styleUrls: ['./return-car-component.component.css']
})
export class ReturnCarComponentComponent implements OnInit {

  orderList:OrderList=new OrderList();
  carNumber:string;
  private pipe = new DatePipe("en-US");
  constructor(private myOrderService:OrderService,private alertService: AlertService,private myUserService: UserService, private router: Router) { }

  ngOnInit() {
    if(this.myUserService.userList.singleUser.UserRole!=1){
      if(this.myUserService.userList.singleUser.UserRole!=2){
      this.router.navigate(['/Home']);
      return;
      }
    }
    this.orderList.orderList=new Array<Order>();
  }

  onSubmit(){
    //debugger;
    this.myOrderService.getOrderByCarNumber(this.carNumber).then(()=>this.orderList=this.myOrderService.orderList);
  }

  returnCar(order:Order){
    let endDate: any = new Date(this.pipe.transform(order.EndOfRentDate));
    let startDate: any = new Date(this.pipe.transform(order.StartRentDate));
   let returnDate=new Date(this.pipe.transform(new Date()));
    if(returnDate<endDate){
      endDate=returnDate;
    }else{
      if(returnDate< startDate){
      debugger;
      returnDate= startDate;
    }
  }
      
      order.StartRentDate=startDate;
      order.ReturnDate=returnDate;
      order.EndOfRentDate=endDate;
    this.myOrderService.editOrder(order,order.OrderId).subscribe(()=>this.orderList=this.myOrderService.orderList,()=> this.alertService.error("error"));
    this.myOrderService.setTotalPrice();
  }

}
