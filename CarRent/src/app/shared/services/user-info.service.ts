
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user-info.model";
import { Observable, Subscription } from "rxjs";
import { UserList } from "../models/user-info-list.model";



@Injectable()
export class UserService {

    private link = "http://localhost:50181/api/User";
    userList: UserList = new UserList();
    constructor(private myHttpClient: HttpClient) {
        this.getAllUsers();
    }

    getAllUsers() {
       return this.myHttpClient.get(this.link).toPromise().then((x: Array<User>) => { this.userList.userList = x; },()=>console.log("error"));
    }


    getUserByNameAndPassword(userName: string, password: string) {

        return this.myHttpClient.get(`${this.link}/${userName}/${password}`).toPromise().then
            ((x: User) => { this.userList.singleUser = x; }, () => this.userList.singleUser = { FullName: "Guest" });



    }
    getUserByUserId(userId:number){
      
        return this.myHttpClient.get(`${this.link}?userId=${userId}`).
        toPromise().then((x: User) => { this.userList.singleUser = x; }); 
     }

     getUserToEditByUserId(userId:number){
      
        return this.myHttpClient.get(`${this.link}?userId=${userId}`).
        toPromise().then((x: User) => { this.userList.userToEdit = x; }); 
     }

     editUser(user:User,userId:number){
      return this.myHttpClient.put<boolean>(`${this.link}/${userId}`,JSON.stringify(user), { headers: {"content-type": "application/json" }});
    }
    
    addUser(user: User) {

        return this.myHttpClient.post(this.link, JSON.stringify(user), { headers: { "content-type": "application/json" } });

 
    }

    deleteUser(userId:number):Observable<boolean>{
        let apiUrl:string=`${this.link}?userId=${userId}`;
        return this.myHttpClient.delete<boolean>(apiUrl);
    }



}