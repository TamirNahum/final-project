import { Component, OnInit } from '@angular/core';
import { CarTypeInfo } from '../shared/models/car-type-info.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CarTypeService } from '../shared/services/car-type-info.service';
import { Router } from '@angular/router';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-add-car-type',
  templateUrl: './add-car-type.component.html',
  styleUrls: ['./add-car-type.component.css']
})
export class AddCarTypeComponent implements OnInit {

 
  carTypeToEdit: CarTypeInfo;
  addCarTypeForm: any;

  loading = false;
  submitted = false;


  constructor(private formBuilder: FormBuilder, private myCarTypeService: CarTypeService, private router: Router, private alertService: AlertService) {

    this.carTypeToEdit={
      DailyCost:undefined,
      DayOverdueCost:undefined,
      Manufacturer:undefined,
      ManufacturYear:undefined,
      Model:undefined,
      IsManual:undefined,

    }
    this.addCarTypeForm = new FormGroup({
      manufacturer: new FormControl(this.carTypeToEdit.Manufacturer, Validators.compose([
        Validators.required])
      ),
      manufacturYear: new FormControl(this.carTypeToEdit.ManufacturYear, Validators.compose([
        Validators.required])
      ),
      model: new FormControl(this.carTypeToEdit.Model, Validators.compose([
        Validators.required])
      ),
      isManual: new FormControl(this.carTypeToEdit.IsManual, Validators.compose([
        Validators.required])
      ),
      dailyCost: new FormControl(this.carTypeToEdit.DailyCost, Validators.compose([
        Validators.required])
      ),
      dayOverdueCost: new FormControl(this.carTypeToEdit.DayOverdueCost, Validators.compose([
        Validators.required])
      ),

    });
 

  }

  ngOnInit() {
  }



  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
     if (this.addCarTypeForm.invalid) {
      this.alertService.error("you must fill all the fields");
         return;
     }
 
    this.loading = true;
    let callback = (bool: boolean) => { (bool) ? "action success" : "action fail"; }
    // debugger;
    this.myCarTypeService.addCarType(this.carTypeToEdit).subscribe(
      data => {
        this.alertService.success('CarType added successful', true);
        this.myCarTypeService.initCars();
        this.router.navigate(['/Manage-Car-Types']);
      },
      error => {
        this.alertService.error("error");
        this.loading = false;
      });
  }
}

