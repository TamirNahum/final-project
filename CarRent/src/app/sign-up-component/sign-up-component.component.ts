import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user-info.model';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../shared/services/user-info.service';
import { AlertService } from '../shared/services/alert.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UploadImageService } from '../shared/services/upload-image.service';

@Component({
  selector: 'app-sign-up-component',
  templateUrl: './sign-up-component.component.html',
  styleUrls: ['./sign-up-component.component.css']
})
export class SignUpComponentComponent implements OnInit {

  localUser: User;
  registerForm: any;
  successParam: boolean;
  loading = false;
  submitted = false;
  confirmPassword: string;
  imageUrl: string = "";
  fileToUpload: File = null;

  constructor(private formBuilder: FormBuilder, private imageService: UploadImageService, private myUserService: UserService, private router: Router, private alertService: AlertService) {
    this.localUser = {
      FullName: undefined,
      UserName: undefined,
      IdNumber: undefined,
      BirthDate: undefined,
      IsMale: undefined,
      Email: undefined,
      Password: undefined
    };
    this.registerForm = new FormGroup({
      fullName: new FormControl(this.localUser.FullName, Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])

      ),
      userName: new FormControl(this.localUser.UserName, Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])
      ),
      idNumber: new FormControl(this.localUser.IdNumber, Validators.compose([
        Validators.required,

        Validators.pattern("^[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]$"),
      Validators.maxLength(9)])

      ),
      birthDate: new FormControl(this.localUser.BirthDate, Validators.compose([
  ])
      ),
      isMale: new FormControl(this.localUser.IsMale, Validators.compose([
        Validators.required])
      ),
      email: new FormControl(this.localUser.Email, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])
      ),
      password: new FormControl(this.localUser.Password, Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10)
      ])
      ),
      confirmPassword: new FormControl(this.confirmPassword, Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10)])
      ),

    });
    this.localUser.Image = null;
    this.localUser.UserRole = 3;
    this.localUser.Image = "UserImages/default-user.jpg";

  }


  ////////////////////////////////
  handleFileInput(file: FileList) {
    //Save image to the class property
    this.fileToUpload = file.item(0);


    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => { this.imageUrl = event.target.result; }
    reader.readAsDataURL(this.fileToUpload);
   
  }

  onUpload(caption:string) {
if(this.fileToUpload){
    this.imageService.postUserFile(caption, this.fileToUpload)
      .subscribe(data => { this.localUser.Image=`UserImages/${caption}.jpg`; this.myUserService.addUser(this.localUser).pipe(first()).subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/Log-In']);
        },
        error => {
          this.alertService.error("error");
          this.loading = false;
        });},()=>{  this.localUser.Image="UserImages/default-user.jpg";
    });
}else{
  this.localUser.Image="UserImages/default-user.jpg";
  this.myUserService.addUser(this.localUser).pipe(first()).subscribe(
    data => {
      this.alertService.success('Registration successful', true);
      this.router.navigate(['/Log-In']);
    },
    error => {
      this.alertService.error("error");
      this.loading = false;
    });
}
  }
  ////////////////////////

  ngOnInit() {
  }



  onSubmit() {
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.alertService.error("you must fill all the fields correctly");
      return;
    }
    if (this.confirmPassword != this.localUser.Password) {
      this.alertService.error("passwords doesnt matches");
      return;
    }
    this.onUpload(this.localUser.UserName);
    this.loading = true;
   
  }
}



