import { Component, OnInit } from '@angular/core';
import { CarInfoList } from '../shared/models/car-info-list.model';
import { CarService } from '../shared/services/car-info.service';
import { CarTypeService } from '../shared/services/car-type-info.service';
import { CarTypeInfoList } from '../shared/models/car-type-info-list.model';
import { Car } from '../shared/models/car-info.model';

@Component({
  selector: 'app-car-list-component',
  templateUrl: './car-list-component.component.html',
  styleUrls: ['./car-list-component.component.css']
})
export class CarListComponentComponent implements OnInit {

  carList:CarInfoList=new CarInfoList();
  carTypeList:CarTypeInfoList=new CarTypeInfoList();
  isManual:boolean;
  manufacturer:string;
  manufacturYear:number;
  model:string;

  filterDropDownName:string="Filter by";
  
  constructor(private myCarService: CarService,private myCarTypeService: CarTypeService) { }

  ngOnInit() {
    this.myCarService.initCars().then(()=>this.carList=this.myCarService.carInfo);
    this.carTypeList=this.myCarTypeService.carTypeInfo;
  }

  selectedCar(carNumber:string){
   this.myCarService.getCar(carNumber);
 
  }
  setCarList(){
    debugger;
    if(this.filterDropDownName=="Transmission"){
      this.myCarService.getCarByTransmission(this.isManual).then(()=>this.carList=this.myCarService.carInfo);
    }else{
      if(this.filterDropDownName=="Company"){
        this.myCarService.getCarByManufacturer(this.manufacturer).then(()=>this.carList=this.myCarService.carInfo);
      } else{
        if(this.filterDropDownName=="Model"){
          this.myCarService.getCarByModel(this.model).then(()=>this.carList=this.myCarService.carInfo);
        }else{
        if(this.filterDropDownName=="Manufectur Year"){
          this.myCarService.getCarByManufecturYear(this.manufacturYear).then(()=>this.carList=this.myCarService.carInfo);
        }
      }
      }
      
        
    }
    
  }

public replaceDropDownLabel(s:string){
    this.filterDropDownName=s;
    if(s=="All Cars"){
      this.myCarService.initCars().then(()=>this.carList=this.myCarService.carInfo);
    }
} 
 
}
