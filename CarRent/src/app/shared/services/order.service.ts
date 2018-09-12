
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user-info.model";
import { Observable, pipe } from "rxjs";
import { Order } from "../models/order.model";
import { OrderList } from "../models/order-list.model";
import { DatePipe } from '@angular/common';
import { first } from 'rxjs/operators';
import { UserService } from "./user-info.service";
import { MyLink } from "./my-link.service";




@Injectable()
export class OrderService {
    private link=MyLink.link+"/api/Order";
    orderList:OrderList=new OrderList();
    private pipe = new DatePipe("en-US");
   
    constructor(private myHttpClient: HttpClient, private myUserService:UserService) {    
    }

    getAllOrders(){
  
       return this.myHttpClient.get(this.link,{ headers: {"content-type": "application/json",Authorization:`${this.myUserService.userList.singleUser.UserName} ${this.myUserService.userList.singleUser.Password}`}}).
       toPromise().then((x: Array<Order>) => { this.orderList.orderList = x; }).then(()=>this.setTotalPrice()).catch(()=>{console.log("request failed")});
    }

addOrder(order:Order) {
        
        return this.myHttpClient.post(this.link,JSON.stringify(order), { headers: {"content-type": "application/json",Authorization:`${this.myUserService.userList.singleUser.UserName} ${this.myUserService.userList.singleUser.Password}`}});
        
        
    } 
    getOrderByCarNumber(carNumber:string){
        return this.myHttpClient.get(`${this.link}?carNumber=${carNumber}`,{ headers: {"content-type": "application/json",Authorization:`${this.myUserService.userList.singleUser.UserName} ${this.myUserService.userList.singleUser.Password}`}}).
        toPromise().then((x: Array<Order>) => { this.orderList.orderList = x; }).then(()=>this.setTotalPrice()).catch(()=>{console.log("request failed")});
    }

    getOrdersByUserId(userId:number){
       return this.myHttpClient.get(`${this.link}/?userId=${userId}`,{ headers: {"content-type": "application/json",Authorization:`${this.myUserService.userList.singleUser.UserName} ${this.myUserService.userList.singleUser.Password}`}}).
       toPromise().then((x: Array<Order>) => { this.orderList.orderList = x; }).then(()=>this.setTotalPrice()); 
    }

    getOrderByOrderId(orderId:number){
      
        return this.myHttpClient.get(`${this.link}?orderId=${orderId}`,{ headers: {"content-type": "application/json",Authorization:`${this.myUserService.userList.singleUser.UserName} ${this.myUserService.userList.singleUser.Password}`}}).
        toPromise().then((x: Order) => { this.orderList.singleOrder = x; }); 
     }

editOrder(order:Order,orderId:number){
    debugger;
  return this.myHttpClient.put<boolean>(`${this.link}/${orderId}`,JSON.stringify(order),{ headers: {"content-type": "application/json",Authorization:`${this.myUserService.userList.singleUser.UserName} ${this.myUserService.userList.singleUser.Password}`}});
}

deleteOrder(orderId:number):Observable<boolean>{
    let apiUrl:string=`${this.link}?orderId=${orderId}`;
    return this.myHttpClient.delete<boolean>(apiUrl,{ headers: {"content-type": "application/json",Authorization:`${this.myUserService.userList.singleUser.UserName} ${this.myUserService.userList.singleUser.Password}`}});
}

    setTotalPrice(){
        for (var order of this.orderList.orderList) {
            if(order.ReturnDate){
                let start: any = new Date(this.pipe.transform(order.StartRentDate));
                let end: any = new Date(this.pipe.transform(order.EndOfRentDate));
                let returnDate: any = new Date(this.pipe.transform(order.ReturnDate));
                order.TotalPrice=(((end-start) / (24 * 3600 * 1000) + 1)*order.Car.CarTypeModel.DailyCost);
                if(returnDate>end)
                order.TotalPrice+=((returnDate-end)/ (24 * 3600 * 1000) + 1)*order.Car.CarTypeModel.DayOverdueCost;
            }
        
        } 
    }

}