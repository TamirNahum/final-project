import { Component, OnInit } from '@angular/core';
import { CarInfoList } from '../shared/models/car-info-list.model';
import { CarTypeInfoList } from '../shared/models/car-type-info-list.model';
import { CarService } from '../shared/services/car-info.service';
import { CarTypeService } from '../shared/services/car-type-info.service';
import { Router } from '@angular/router';
import { AlertService } from '../shared/services/alert.service';
import { UserService } from '../shared/services/user-info.service';
import { MyLink } from '../shared/services/my-link.service';

@Component({
  selector: 'app-manage-cars-component',
  templateUrl: './manage-cars-component.component.html',
  styleUrls: ['./manage-cars-component.component.css']
})
export class ManageCarsComponentComponent implements OnInit {

  carList:CarInfoList;
  carTypeList:CarTypeInfoList;
  loading = false;
  link:string=MyLink.link;

  
  constructor(private myCarService: CarService,private myUserService:UserService,private myCarTypeService: CarTypeService,private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    if(this.myUserService.userList.singleUser.UserRole!=1){
      this.router.navigate(['/Home']);
      return;

    }
    this.carList=this.myCarService.carInfo;
    this.carTypeList=this.myCarTypeService.carTypeInfo;
  }

  onEdit(carNumber:string){
   this.myCarService.getCar(carNumber).then(()=>this.router.navigate(['../Edit-Car']));
  }

  onDelete(carId:number){
    this.loading=true;
    document.documentElement.scrollTop = 0;
    this.myCarService.deleteCar(carId).subscribe(
      data => {
      this.alertService.success('deleted successfuly');
      this.myCarService.initCars().then(()=>this.carList=this.myCarService.carInfo);
      this.loading = false;


    },
    error => {
      this.alertService.error("error");
      this.loading = false;

    });
  }
}


