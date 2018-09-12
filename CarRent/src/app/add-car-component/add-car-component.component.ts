import { Component, OnInit } from '@angular/core';
import { CarInfoList } from '../shared/models/car-info-list.model';
import { CarTypeInfo } from '../shared/models/car-type-info.model';
import { BranchInfo } from '../shared/models/branch-info.model';
import { Car } from '../shared/models/car-info.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BranchService } from '../shared/services/branch.service';
import { CarTypeService } from '../shared/services/car-type-info.service';
import { CarService } from '../shared/services/car-info.service';
import { Router } from '@angular/router';
import { AlertService } from '../shared/services/alert.service';
import { UploadImageService } from '../shared/services/upload-image.service';
import { UserService } from '../shared/services/user-info.service';

@Component({
  selector: 'app-add-car-component',
  templateUrl: './add-car-component.component.html',
  styleUrls: ['./add-car-component.component.css']
})
export class AddCarComponentComponent implements OnInit {

  localCar: CarInfoList = new CarInfoList();
  selectedCarType:CarTypeInfo;
  selectedBranch:BranchInfo;
  carToEdit: Car;
  addCarForm: any;
  imageUrl: string = "";
  fileToUpload: File = null;
  loading = false;
  submitted = false;




  constructor(private formBuilder: FormBuilder,private myUserService:UserService,private myBranchService:BranchService,private imageService: UploadImageService,private myCarTypeService:CarTypeService, private myCarService: CarService, private router: Router, private alertService: AlertService) {
    this.carToEdit = {
      CarId: undefined,
      CarType:undefined,
      CarNumber: undefined,
      Kilometerage: undefined,
      IsProperForRent: undefined,
      IsFreeForRent: undefined,
      AvailableAtBranch:undefined,
      Image:"CarImages/default-car.jpg",
      CarTypeModel:undefined,
      Branch: undefined
    };

    this.addCarForm = new FormGroup({
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
    this.myCarTypeService.initCars();
      
  }

  ////////////////////////////////
  ////////////////////////////////
  handleFileInput(file: FileList) {
    //Save image to the class property
    this.fileToUpload = file.item(0);


    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => { this.imageUrl = event.target.result; }
    reader.readAsDataURL(this.fileToUpload);
   
  }

  onUpload(caption:string) {
    if(this.fileToUpload){

  // .subscribe(data => { this.localUser.Image=`UserImages/${caption}.jpg`},()=>{  this.localUser.Image="UserImages/default-user.jpg";
   return this.imageService.postCarFile(caption, this.fileToUpload)
   .subscribe(data => { this.carToEdit.Image=`CarImages/${caption}.jpg`; this.myCarService.addCar(this.carToEdit).subscribe(
    data => {
      this.alertService.success('edited successful', true);
      this.myCarService.initCars();
      this.router.navigate(['/Manage-Cars']);
    },
    error => {
      this.alertService.error("error");
      this.loading = false;
    });}),()=>{this.carToEdit.Image="CarImages/default-car.jpg"; };
}else{
  this.carToEdit.Image="CarImages/default-car.jpg";
  this.myCarService.addCar(this.carToEdit).subscribe(
    data => {
      this.alertService.success('edited successful', true);
      this.myCarService.initCars();
      this.router.navigate(['/Manage-Cars']);
    },
    error => {
      this.alertService.error("error");
      this.loading = false;
    });
  return new Promise(()=>{});
}
  }
////////////////////////
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
    this.myCarService.isExist(this.carToEdit.CarNumber).subscribe(
      ()=>{ 
         this.loading=false;
      this.alertService.error("there is a car with this lisence number")
      this.submitted=false;
    }
      ,()=> {this.onUpload(this.carToEdit.CarNumber);});
    

    
    
  }

}
