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

  constructor(private formBuilder: FormBuilder, private myUserService: UserService,private myCarService:CarService,private myOrderService:OrderService, private router: Router, private alertService: AlertService) {
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
    
    this.userList=this.myUserService.userList;
    this.carList=this.myCarService.carInfo;
  }

}
