import { Component, OnInit } from '@angular/core';
import { CarTypeInfoList } from '../shared/models/car-type-info-list.model';
import { CarTypeService } from '../shared/services/car-type-info.service';
import { Router } from '@angular/router';
import { AlertService } from '../shared/services/alert.service';
import { CarTypeInfo } from '../shared/models/car-type-info.model';

@Component({
  selector: 'app-manage-car-types',
  templateUrl: './manage-car-types.component.html',
  styleUrls: ['./manage-car-types.component.css']
})
export class ManageCarTypesComponent implements OnInit {

  
  private carTypeList:CarTypeInfoList=new CarTypeInfoList();
  loading = false;
  
    constructor(private myCarTypeService: CarTypeService, private router: Router, private alertService: AlertService) { }
  
    ngOnInit() {
      this.carTypeList=this.myCarTypeService.carTypeInfo;

  
    }
  
    onEdit(carType:CarTypeInfo){
      this.myCarTypeService.carTypeInfo.singleCar=carType;
      this.router.navigate(['../Edit-Car-Type']);
    }
  
    onDelete(carTypeId:number){
      this.loading=true;
      document.documentElement.scrollTop = 0;
      this.myCarTypeService.deleteCarType(carTypeId).subscribe(
        data => {
        this.alertService.success('deleted successfuly');
        this.myCarTypeService.initCars().then(()=>this.carTypeList=this.myCarTypeService.carTypeInfo);
        this.loading = false;
  
  
      },
      error => {
        this.alertService.error("error");
        this.loading = false;
  
      });
  
    }
  
  }
  