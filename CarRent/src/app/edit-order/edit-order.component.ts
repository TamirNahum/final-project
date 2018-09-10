import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/models/order.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderList } from '../shared/models/order-list.model';
import { OrderService } from '../shared/services/order.service';
import { Router } from '@angular/router';
import { AlertService } from '../shared/services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {
  localOrder: OrderList=new OrderList();
  editOrderForm: any;
  successParam: boolean;
  loading = false;
  submitted = false;
  startDate: Date ;
  endDate: Date ;
  returnDate: Date;



  constructor(private formBuilder: FormBuilder, private myOrderService: OrderService, private router: Router, private alertService: AlertService) {

    this.localOrder=this.myOrderService.orderList;
    this.startDate=this.localOrder.singleOrder.StartRentDate;
    this.endDate=this.localOrder.singleOrder.EndOfRentDate;
this.returnDate=this.localOrder.singleOrder.ReturnDate;
    this.editOrderForm = new FormGroup({
      startRentDate: new FormControl(this.startDate, Validators.compose([
       ])
      ),
      endRentDate: new FormControl(this.endDate, Validators.compose([
        ])
      ),
      returnDate: new FormControl(this.returnDate, Validators.compose([
       ])
      ),
      

    });
    this.localOrder.singleOrder.UserId =this.myOrderService.orderList.singleOrder.UserId;
    this.localOrder.singleOrder.CarId =this.myOrderService.orderList.singleOrder.CarId;

  }

  ngOnInit() {

  }

  ngOnChanges(){
    console.log(this.localOrder.singleOrder.StartRentDate,this.localOrder.singleOrder.EndOfRentDate)
  }



  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    /* if (this.editOrderForm.invalid) {
      this.alertService.error("you must fill all the fields");
         return;
     }*/
     this.localOrder.singleOrder.EndOfRentDate=this.endDate;
     this.localOrder.singleOrder.StartRentDate=this.startDate;
     this.localOrder.singleOrder.ReturnDate=this.returnDate

 
    this.loading = true;

    this.myOrderService.editOrder(this.localOrder.singleOrder,this.localOrder.singleOrder.OrderId).subscribe(
      data => {
        this.alertService.success('edited successful', true);
        this.router.navigate(['/Manage-Orders']);
      },
      error => {
        this.alertService.error("error");
        this.loading = false;
      });
  }
}