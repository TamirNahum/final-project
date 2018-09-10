import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/services/car-info.service';
import { Car } from '../shared/models/car-info.model';
import { CarInfoList } from '../shared/models/car-info-list.model';
import { OrderService } from '../shared/services/order.service';
import { OrderList } from '../shared/models/order-list.model';

@Component({
  selector: 'app-car-order-component',
  templateUrl: './car-order-component.component.html',
  styleUrls: ['./car-order-component.component.css']
})
export class CarOrderComponentComponent implements OnInit {

  carList:CarInfoList;
  orderList:OrderList;
  constructor(private myCarService: CarService,private myOrderService: OrderService) { }

  ngOnInit() {
    this.carList=this.myCarService.carInfo;
    debugger;
    this.orderList=this.myOrderService.orderList;
  }
}
