import { Component, OnInit } from '@angular/core';
import { UserList } from '../shared/models/user-info-list.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user-info.service';
import { Router } from '@angular/router';
import { AlertService } from '../shared/services/alert.service';
import { User } from '../shared/models/user-info.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  localUser: UserList=new UserList();
  userToEdit:User;
  editUserForm: any;
  successParam: boolean;
  loading = false;
  submitted = false;
 



  constructor(private formBuilder: FormBuilder, private myUserService: UserService, private router: Router, private alertService: AlertService) {

    this.localUser=this.myUserService.userList;
    this.userToEdit={
      FullName:this.localUser.userToEdit.FullName,
      Email:this.localUser.userToEdit.Email,
      BirthDate:this.localUser.userToEdit.BirthDate,
      IdNumber:this.localUser.userToEdit.IdNumber,
      Image:this.localUser.userToEdit.Image,
      IsMale:this.localUser.userToEdit.IsMale,
      Password:this.localUser.userToEdit.Password,
      UserId:this.localUser.userToEdit.UserId,
      UserName:this.localUser.userToEdit.UserName,
      UserRole:this.localUser.userToEdit.UserRole,
    };
    this.editUserForm = new FormGroup({
      fullName: new FormControl(this.userToEdit.FullName, Validators.compose([ ])
      ),
      userName: new FormControl(this.userToEdit.UserName, Validators.compose([ ])
      ),
      idNumber: new FormControl(this.userToEdit.IdNumber, Validators.compose([])
      ),
      birthDate: new FormControl(this.userToEdit.BirthDate, Validators.compose([])
      ),
      isMale: new FormControl(this.userToEdit.IsMale, Validators.compose([])
      ),
      email: new FormControl(this.userToEdit.Email, Validators.compose([])
      ),
      password: new FormControl(this.userToEdit.Password, Validators.compose([])
      ),
      userRole: new FormControl(this.userToEdit.UserRole, Validators.compose([])
      ),

    });
    this.userToEdit.Image = "";

  }


  ngOnInit() {

  }

  ngOnChanges(){
  }



  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    /* if (this.editOrderForm.invalid) {
      this.alertService.error("you must fill all the fields");
         return;
     }*/

 
    this.loading = true;
    // debugger;
    this.myUserService.editUser(this.userToEdit,this.userToEdit.UserId).subscribe(
      data => {
        this.alertService.success('edited successful', true);
        this.router.navigate(['/Manage-Users']);
      },
      error => {
        this.alertService.error("error");
        this.loading = false;
      });
  }
}