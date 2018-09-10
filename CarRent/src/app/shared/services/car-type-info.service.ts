import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { CarTypeInfoList } from "../models/car-type-info-list.model";
import { CarTypeInfo } from "../models/car-type-info.model";


@Injectable()
export class CarTypeService {
    private link="http://localhost:50181/api/CarTypes";
    carTypeInfo:CarTypeInfoList = new CarTypeInfoList();

    constructor(private myHttpClient: HttpClient) {
        this.initCars();
     }

    initCars() {
       return this.myHttpClient.get(this.link)
            .toPromise().then((x: Array<CarTypeInfo>) => { this.carTypeInfo.carTypeList = x; });
    }

    addCarType(carType:CarTypeInfo) {
        
        return this.myHttpClient.post(this.link,JSON.stringify(carType), { headers: {"content-type": "application/json" }});
        
        
    } 
    editCarType(carType:CarTypeInfo,carTypeId:number){
        return this.myHttpClient.put<boolean>(`${this.link}/${carTypeId}`,JSON.stringify(carType), { headers: {"content-type": "application/json" }});
      }

    deleteCarType(carTypeId:number):Observable<boolean>{
            let apiUrl:string=`${this.link}?carTypeId=${carTypeId}`;
            return this.myHttpClient.delete<boolean>(apiUrl);
    }

}