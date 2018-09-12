import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { CarTypeInfoList } from "../models/car-type-info-list.model";
import { CarTypeInfo } from "../models/car-type-info.model";
import { UserService } from "./user-info.service";
import { MyLink } from "./my-link.service";


@Injectable()
export class CarTypeService {
    private link=MyLink.link+"/api/CarTypes";
    carTypeInfo:CarTypeInfoList = new CarTypeInfoList();

    constructor(private myHttpClient: HttpClient,private myUserService:UserService) {
        this.initCars();
     }

    initCars() {
       return this.myHttpClient.get(this.link)
            .toPromise().then((x: Array<CarTypeInfo>) => { this.carTypeInfo.carTypeList = x; });
    }

    addCarType(carType:CarTypeInfo) {
        
        return this.myHttpClient.post(this.link,JSON.stringify(carType),{ headers: {"content-type": "application/json",Authorization:`${this.myUserService.userList.singleUser.UserName} ${this.myUserService.userList.singleUser.Password}`}});
        
        
    } 
    editCarType(carType:CarTypeInfo,carTypeId:number){
        return this.myHttpClient.put<boolean>(`${this.link}/${carTypeId}`,JSON.stringify(carType),{ headers: {"content-type": "application/json",Authorization:`${this.myUserService.userList.singleUser.UserName} ${this.myUserService.userList.singleUser.Password}`}});
      }

    deleteCarType(carTypeId:number):Observable<boolean>{
            let apiUrl:string=`${this.link}?carTypeId=${carTypeId}`;
            return this.myHttpClient.delete<boolean>(apiUrl,{ headers: {"content-type": "application/json",Authorization:`${this.myUserService.userList.singleUser.UserName} ${this.myUserService.userList.singleUser.Password}`}});
    }

}