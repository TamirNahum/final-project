
import { User } from "./user-info.model";
import { Car } from "./car-info.model";

export interface Order {
    OrderId?:number;
    StartRentDate: Date;
    ReturnDate?: Date;
    EndOfRentDate: Date;
    UserId?:number;
    CarId?:number;
    Car?:Car;
    User?:User;
    TotalPrice?:number;
}
