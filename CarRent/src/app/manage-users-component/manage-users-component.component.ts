import { Component, OnInit } from '@angular/core';
import { UserList } from '../shared/models/user-info-list.model';
import { UserService } from '../shared/services/user-info.service';
import { Router } from '@angular/router';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-manage-users-component',
  templateUrl: './manage-users-component.component.html',
  styleUrls: ['./manage-users-component.component.css']
})
export class ManageUsersComponentComponent implements OnInit {

  private userList:UserList=new UserList();
  loading = false;
  
    constructor(private myUserService: UserService, private router: Router, private alertService: AlertService) { }
  
    ngOnInit() {
      this.myUserService.getAllUsers().then(()=>this.userList=this.myUserService.userList);
  
    }
  
    onEdit(userId:number){
      this.myUserService.getUserToEditByUserId(userId).then(()=>this.router.navigate(['../Edit-User']));
    }
  
    onDelete(userId:number){
      this.loading=true;
      document.documentElement.scrollTop = 0;
      this.myUserService.deleteUser(userId).subscribe(
        data => {
        this.alertService.success('deleted successfuly');
        this.myUserService.getAllUsers().then(()=>this.userList=this.myUserService.userList);
        this.loading = false;
  
  
      },
      error => {
        this.alertService.error("error");
        this.loading = false;
  
      });
  
    }
  
  }
  