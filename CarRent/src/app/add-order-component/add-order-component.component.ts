import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../shared/services/user-info.service';
import { Router } from '@angular/router';
import { AlertService } from '../shared/services/alert.service';
import { Order } from '../shared/models/order.model';
import { OrderList } from '../shared/models/order-list.model';
import { UserList } from '../shared/models/user-info-list.model';
import { User } from '../shared/models/user-info.model';
import { Car } from '../shared/models/car-info.model';
import { CarService } from '../shared/services/car-info.service';
import { OrderService } from '../shared/services/order.service';
import { CarInfoList } from '../shared/models/car-info-list.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-order-component',
  templateUrl: './add-order-component.component.html',
  styleUrls: ['./add-order-component.component.css']
})
export class AddOrderComponentComponent implements OnInit {

  localOrder: OrderList=new OrderList();
  addOrderForm: any;
  successParam: boolean;
  userList:UserList=new UserList();
  carList:CarInfoList=new CarInfoList();
  localUser:User;
  localCar:Car;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private myAlertService:AlertService, private myUserService: UserService,private myCarService:CarService,private myOrderService:OrderService, private router: Router, private alertService: AlertService) {
   this.localOrder.singleOrder={
    StartRentDate:undefined,
    EndOfRentDate:undefined
   };
    this.addOrderForm = new FormGroup({
      startRentDate: new FormControl(this.localOrder.singleOrder.StartRentDate, Validators.compose([
        Validators.required])
      ),
      endRentDate: new FormControl(this.localOrder.singleOrder.EndOfRentDate, Validators.compose([
        Validators.required])
      ),
      returnDate: new FormControl(this.localOrder.singleOrder.ReturnDate, Validators.compose([
        ])
      )
  
    });


  }

  setSelectedUser(user:User){
    this.localUser=user;
    console.log(user);
  }

  setSelectedCar(car:Car){
    this.localCar=car;
    console.log(car);
  }

  onSubmit(){

    this.localOrder.singleOrder.CarId=this.localCar.CarId;
    this.localOrder.singleOrder.UserId=this.localUser.UserId;
    let pipe = new DatePipe("en-US"); // Use your own locale
    let start: any = new Date(pipe.transform(this.localOrder.singleOrder.StartRentDate));
    let end: any = new Date(pipe.transform(this.localOrder.singleOrder.EndOfRentDate));
    if(this.localOrder.singleOrder.ReturnDate){
    let dateReturn: any = new Date(pipe.transform(this.localOrder.singleOrder.ReturnDate));
   
    if (dateReturn - start < 0) {
      this.myAlertService.error("return date  must be late than the start rent day");
      return false;
    }
    if (dateReturn - end < 0) {
      this.localOrder.singleOrder.EndOfRentDate=dateReturn;
    }
  }
    if (end - start < 0) {
      this.myAlertService.error("end of rent date must be late than the start rent day");
      return false;

    }
   


    this.myOrderService.addOrder(this.localOrder.singleOrder).subscribe(
      data => {
        this.alertService.success('Order added Successfuly', true);
        this.router.navigate(['/Manage-Orders']);
      },
      error => {
        this.alertService.error("error");
        this.loading = false;
      });;

  }


  ngOnInit() {
    if(this.myUserService.userList.singleUser.UserRole!=1){
      this.router.navigate(['/Home']);
      return;

    }
    this.myUserService.getAllUsers().then(()=>this.userList=this.myUserService.userList);
    this.carList=this.myCarService.carInfo;
  }

}
