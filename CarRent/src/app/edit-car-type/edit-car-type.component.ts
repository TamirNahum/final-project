import { Component, OnInit } from '@angular/core';
import { CarTypeInfoList } from '../shared/models/car-type-info-list.model';
import { CarTypeInfo } from '../shared/models/car-type-info.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CarTypeService } from '../shared/services/car-type-info.service';
import { Router } from '@angular/router';
import { AlertService } from '../shared/services/alert.service';
import { UserService } from '../shared/services/user-info.service';

@Component({
  selector: 'app-edit-car-type',
  templateUrl: './edit-car-type.component.html',
  styleUrls: ['./edit-car-type.component.css']
})
export class EditCarTypeComponent implements OnInit {

  localCarType: CarTypeInfoList=new CarTypeInfoList();
  carTypeToEdit:CarTypeInfo;
  editCarTypeForm: any;
  loading = false;
  submitted = false;
  



  constructor(private formBuilder: FormBuilder,private myUserService:UserService, private myCarTypeService: CarTypeService, private router: Router, private alertService: AlertService) {

    this.localCarType=this.myCarTypeService.carTypeInfo;
    this.carTypeToEdit={
      CarTypeId:this.localCarType.singleCar.CarTypeId,
      Manufacturer:this.localCarType.singleCar.Manufacturer,
      Model: this.localCarType.singleCar.Model,
      DailyCost: this.localCarType.singleCar.DailyCost,
      DayOverdueCost: this.localCarType.singleCar.DayOverdueCost,
      ManufacturYear:this.localCarType.singleCar.ManufacturYear,
      IsManual:this.localCarType.singleCar.IsManual
     
    };
    this.editCarTypeForm = new FormGroup({
      manufacturer: new FormControl(this.carTypeToEdit.Manufacturer, Validators.compose([ ])
      ),
      model: new FormControl(this.carTypeToEdit.Model, Validators.compose([ ])
      ),
      dailyCost: new FormControl(this.carTypeToEdit.DailyCost, Validators.compose([])
      ),
      dayOverdueCost: new FormControl(this.carTypeToEdit.DayOverdueCost, Validators.compose([])
      ),
      manufacturYear: new FormControl(this.carTypeToEdit.ManufacturYear, Validators.compose([])
      ),
      isManual: new FormControl(this.carTypeToEdit.IsManual, Validators.compose([])
      ),
    

    });
 

  }


  ngOnInit() {
    if(this.myUserService.userList.singleUser.UserRole!=1){
      this.router.navigate(['/Home']);
      return;

    }
  }

  ngOnChanges(){
  }



  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    /* if (this.editOrderForm.invalid) {
      this.alertService.error("you must fill all the fields");
         return;
     }*/

 
    this.loading = true;
    // debugger;
    this.myCarTypeService.editCarType(this.carTypeToEdit,this.carTypeToEdit.CarTypeId).subscribe(
      data => {
        this.myCarTypeService.initCars();
        this.alertService.success('edited successful', true);
        this.router.navigate(['/Manage-Car-Types']);
      },
      error => {
        this.alertService.error("error");
        this.loading = false;
      });
  }
}