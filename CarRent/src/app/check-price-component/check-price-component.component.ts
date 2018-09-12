import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/services/car-info.service';
import { Car } from '../shared/models/car-info.model';
import { CarInfoList } from '../shared/models/car-info-list.model';
import { OrderService } from '../shared/services/order.service';
import { first } from 'rxjs/operators';
import { Order } from '../shared/models/order.model';
import { UserService } from '../shared/services/user-info.service';
import { AlertService } from '../shared/services/alert.service';
import { Router } from '@angular/router';
import { OrderList } from '../shared/models/order-list.model';
import { DatePipe } from '@angular/common';
import { MyLink } from '../shared/services/my-link.service';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-check-price-component',
  templateUrl: './check-price-component.component.html',
  styleUrls: ['./check-price-component.component.css']
})
export class CheckPriceComponentComponent implements OnInit {

  numberOfDays: number;
  carList: CarInfoList = new CarInfoList();
  totalPrice: number;
  startDate: Date = undefined;
  endDate: Date = undefined;
  loading = false;
  submitted = false;
  link: string = MyLink.link;
  orderOfCar: Array<Order>;

  localOrderList: OrderList = new OrderList();

  localOrder: Order = {
    StartRentDate: undefined,
    EndOfRentDate: undefined,
    Car: undefined,
    User: undefined,
  }

  str: string;
  constructor(private myCarService: CarService, private router: Router, private myOrderService: OrderService, private myUserService: UserService, private myAlertService: AlertService) {
  }

  ngOnInit() {
    debugger;
    this.carList = this.myCarService.carInfo;
    this.myOrderService.getOrderByCarNumber(this.carList.singleCar.CarNumber).then(() => this.localOrderList.orderList = this.myOrderService.orderList.orderList);

    //this.dailyCost=this.myCarService.carInfo.singleCar.CarType.DailyCost;
    //this.localOrder.Car=this.carList.singleCar;
  }
  onSubmit() {
    if (!this.checkDates()) {
      return;
    }
    this.submitted = true;
    // stop here if form is invalid
    /* if (this.userForm.invalid) {
         return;
     }
 */
    this.loading = true;
    this.localOrderList.singleOrder = {

      EndOfRentDate: this.endDate,
      StartRentDate: this.startDate,
      CarId: this.myCarService.carInfo.singleCar.CarId,
      UserId: this.myUserService.userList.singleUser.UserId,
      Car:this.myCarService.carInfo.singleCar,
      TotalPrice: this.totalPrice
    };




    this.myOrderService.addOrder(this.localOrderList.singleOrder).pipe(first()).subscribe(
      data => {
        this.myAlertService.success('order succeed', true);
        this.loading = false;
        this.myOrderService.orderList = this.localOrderList;
        this.router.navigate(['/Car-Order']);
        console.log("good");
      },
      error => {
        this.myAlertService.error("error");
        this.loading = false;

        console.log("bad");
      });
  }


  checkDates(): boolean {
    debugger;
    let price = this.carList.singleCar.CarTypeModel.DailyCost;
    let pipe = new DatePipe("en-US"); // Use your own locale
    let start: any = new Date(pipe.transform(this.startDate));
    let end: any = new Date(pipe.transform(this.endDate));
    let today: any = new Date(pipe.transform(new Date()));
    for (var order of this.localOrderList.orderList) {
      let orderStart=new Date(pipe.transform(order.StartRentDate));
      let orderEnd=new Date(pipe.transform(order.EndOfRentDate));

      if (start >= orderStart && start <orderEnd) {
        this.myAlertService.error(`the car is not free between ${pipe.transform(orderStart,"dd-MM-yyy")} to  ${pipe.transform(orderEnd,"dd-MM-yyyy")} `);
        return false;
      }
      else {
        if (end >= order.StartRentDate && end < order.EndOfRentDate) {
          this.myAlertService.error(`the car is not free between ${pipe.transform(orderStart,"dd-MM-yyyy")} to  ${pipe.transform(orderEnd,"dd-MM-yyyy")}  `);

          return false;
        }

      }
    }

    if ((!this.startDate || !this.endDate)) {
      this.myAlertService.error("you must enter both dates");
      return false;
    } else {
      if (end - start < 0) {
        this.myAlertService.error("end of rent date must be late than the start rent day");
        return false;

      }
      else {
        if (today - end > 0 || today - start > 0) {
          this.myAlertService.error("date of rent cant be in the past");
          return false;

        } else {

          this.numberOfDays = ((end - start) / (24 * 3600 * 1000) + 1);
          this.totalPrice = this.numberOfDays * price;
          this.myAlertService.success(`the price for ${this.numberOfDays} days is ${this.totalPrice}`);

          return true;


        }
      }

    }


  }
}
