import { Component, OnInit } from '@angular/core';
import { CarInfoList } from '../shared/models/car-info-list.model';
import { Car } from '../shared/models/car-info.model';
import { CarService } from '../shared/services/car-info.service';
import { Router } from '@angular/router';
import { AlertService } from '../shared/services/alert.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CarTypeService } from '../shared/services/car-type-info.service';
import { CarTypeInfo } from '../shared/models/car-type-info.model';
import { BranchService } from '../shared/services/branch.service';
import { BranchInfo } from '../shared/models/branch-info.model';
import { UserService } from '../shared/services/user-info.service';

@Component({
  selector: 'app-edit-car-component',
  templateUrl: './edit-car-component.component.html',
  styleUrls: ['./edit-car-component.component.css']
})
export class EditCarComponentComponent implements OnInit {
  localCar: CarInfoList = new CarInfoList();
  selectedCarType:CarTypeInfo;
  selectedBranch:BranchInfo;
  carToEdit: Car;
  editCarForm: any;

  loading = false;
  submitted = false;




  constructor(private formBuilder: FormBuilder,private myUserService:UserService,private myBranchService:BranchService,private myCarTypeService:CarTypeService, private myCarService: CarService, private router: Router, private alertService: AlertService) {
    this.localCar = this.myCarService.carInfo;
    this.carToEdit = {
      CarId: this.myCarService.carInfo.singleCar.CarId,
      CarType: this.myCarService.carInfo.singleCar.CarType,
      CarNumber: this.myCarService.carInfo.singleCar.CarNumber,
      Kilometerage: this.myCarService.carInfo.singleCar.Kilometerage,
      IsProperForRent: this.myCarService.carInfo.singleCar.IsProperForRent,
      IsFreeForRent: this.myCarService.carInfo.singleCar.IsFreeForRent,
      AvailableAtBranch: this.myCarService.carInfo.singleCar.AvailableAtBranch,
      Image: this.myCarService.carInfo.singleCar.Image,
      CarTypeModel: this.myCarService.carInfo.singleCar.CarTypeModel,
      Branch: this.myCarService.carInfo.singleCar.Branch
    };

    this.editCarForm = new FormGroup({
      carNumber: new FormControl(this.carToEdit.CarNumber, Validators.compose([
      ])
      ),
      kilometerage: new FormControl(this.carToEdit.Kilometerage, Validators.compose([
      ])
      ),
      isProperForRent: new FormControl(this.carToEdit.IsProperForRent, Validators.compose([
      ])
      ),
  

    });

    

  }

  ngOnInit() {
    if(this.myUserService.userList.singleUser.UserRole!=1){
      this.router.navigate(['/Home']);
      return;

    }
  }
  setSelectedBranch(branch:BranchInfo){
    this.selectedBranch=branch;
    this.carToEdit.Branch=branch;
  }

  setSelectedCarType(carType:CarTypeInfo){
    this.selectedCarType=carType;
    this.carToEdit.CarTypeModel=carType;
  }




  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    /* if (this.editOrderForm.invalid) {
      this.alertService.error("you must fill all the fields");
         return;
     }*/
    this.carToEdit.AvailableAtBranch=this.carToEdit.Branch.BranchId;
    this.carToEdit.CarType=this.carToEdit.CarTypeModel.CarTypeId;


    this.loading = true;

    this.myCarService.editCar(this.carToEdit, this.carToEdit.CarId).subscribe(
      data => {
        this.alertService.success('edited successful', true);
        this.myCarService.initCars();
        this.router.navigate(['/Manage-Cars']);
      },
      error => {
        this.alertService.error("error");
        this.loading = false;
      });
  }
}
