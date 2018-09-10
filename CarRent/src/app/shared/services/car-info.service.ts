import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Car } from "../models/car-info.model";
import { Observable } from "rxjs";
import { CarInfoList } from "../models/car-info-list.model";


@Injectable()
export class CarService {
    private link = "http://localhost:50181/api/Cars";
    carInfo: CarInfoList = new CarInfoList();

    constructor(private myHttpClient: HttpClient) {
        this.initCars();
    }

    

    initCars() {
        return this.myHttpClient.get(this.link)
            .toPromise().then((x: Array<Car>) => { this.carInfo.carList = x; });
    }

    getCar(carNumber: string) {
        return this.myHttpClient.get(`${this.link}?carNumber=${carNumber}`)
            .toPromise().then((x: Car) => { this.carInfo.singleCar = x; });
    }

    getCarByTransmission(isManual: boolean) {
     
        let boolStr: string=   isManual.toString();
        return this.myHttpClient.get(`${this.link}/getManual/?isManual=${boolStr}`)
            .toPromise().then((x: Array<Car>) => { this.carInfo.carList = x; });
    }

    getCarByManufecturYear(manufecturYear: number) {
    
        return this.myHttpClient.get(`${this.link}/getYear/?manufecturYear=${manufecturYear}`)
            .toPromise().then((x: Array<Car>) => { this.carInfo.carList = x; });
    }
    getCarByManufacturer(manufacturer: string) {
        return this.myHttpClient.get(`${this.link}/getCompany/?manufacturer=${manufacturer}`)
            .toPromise().then((x: Array<Car>) => { this.carInfo.carList = x; });
    }
    getCarByModel(model: string) {
        return this.myHttpClient.get(`${this.link}/getModel/?model=${model}`)
            .toPromise().then((x: Array<Car>) => { this.carInfo.carList = x; });
    }



    addCar(car: Car) {

        return this.myHttpClient.post(this.link, JSON.stringify(car), { headers: { "content-type": "application/json" } });

    }

    editCar(car: Car, carId: number) {
        debugger;
        return this.myHttpClient.put<boolean>(`${this.link}/${carId}`, JSON.stringify(car), { headers: { "content-type": "application/json" } });
    }

    deleteCar(carId: number): Observable<boolean> {
        let apiUrl: string = `${this.link}?carId=${carId}`;
        return this.myHttpClient.delete<boolean>(apiUrl);
    }

}