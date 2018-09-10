import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user-info.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user-info.service';
import { Router } from '@angular/router';
import { AlertService } from '../shared/services/alert.service';
import { ISubscription } from 'rxjs/Subscription';
import { nextTick } from 'q';

@Component({
  selector: 'app-log-in-component',
  templateUrl: './log-in-component.component.html',
  styleUrls: ['./log-in-component.component.css']
})
export class LogInComponentComponent implements OnInit {

  localUser: User;
  logInForm: any;
  userName: string = undefined;
  password: string = undefined;

  constructor(private formBuilder: FormBuilder, private myUserService: UserService, private router: Router, private alertService: AlertService) {
    this.localUser = {
      FullName: undefined,
      UserName: undefined,
      IdNumber: undefined,
      BirthDate: undefined,
      IsMale: undefined,
      Email: undefined,
      Password: undefined
    };

    this.logInForm = new FormGroup({
      userName: new FormControl(this.userName, Validators.compose([
        Validators.required,
        Validators.minLength(4)])
      ),
      password: new FormControl(this.password, Validators.compose([
        Validators.required,
        Validators.minLength(4)])
      )

    });
  }

  ngOnInit() {

  }

  onSubmit() {
    if (!this.logInForm.invalid) {
      this.myUserService.getUserByNameAndPassword(this.userName, this.password)
      .then(() => { if(this.myUserService.userList.singleUser.UserName){this.localUser = this.myUserService.userList.singleUser;this.router.navigate(['/Home'])}else{this.alertService.error("username or password are wrong");}});
  }else{
    this.alertService.error("username or password are wrong");
  }
 
  }

}


