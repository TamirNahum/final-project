import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user-info.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user-info.service';
import { Router } from '@angular/router';
import { AlertService } from '../shared/services/alert.service';
import { first } from 'rxjs/operators';
import { UploadImageService } from '../shared/services/upload-image.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  localUser: User;
  addUserForm: any;
  successParam: boolean;
  loading = false;
  submitted = false;
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
    this.addUserForm = new FormGroup({
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
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern("/^[0-9]/")])

      ),
      birthDate: new FormControl(this.localUser.BirthDate, Validators.compose([
        Validators.required])
      ),
      isMale: new FormControl(this.localUser.IsMale, Validators.compose([
        Validators.required])
      ),
      email: new FormControl(this.localUser.Email, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])
      ),
      password: new FormControl(this.localUser.Password, Validators.compose([
        Validators.required,
        Validators.minLength(6)])
      ),

    });
    this.localUser.Image = "UserImages/default-user.jpg";
    this.localUser.UserRole = 3;

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
        .subscribe(data => { this.localUser.Image=`UserImages/${caption}.jpg`;this.myUserService.addUser(this.localUser).pipe(first()).subscribe(
          data => {
            this.alertService.success('User added successful', true);
            this.router.navigate(['/Manage-Users']);
          },
          error => {
            this.alertService.error("error");
            this.loading = false;
          });}
          ,()=>{  this.localUser.Image="UserImages/default-user.jpg";
      });
  }else{
    this.localUser.Image="UserImages/default-user.jpg";
  }
    }

  ngOnInit() {
  }



  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
   /* if (this.addUserForm.invalid) {
      this.alertService.error("you must fill all the fields");
      return;
    }*/

    this.loading = true;
    // debugger;
    this.onUpload(this.localUser.UserName);

    
  }
}
