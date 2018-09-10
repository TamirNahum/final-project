import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private myUserService: UserService) { }

  logOut(){
    this.myUserService.userList.singleUser={FullName:"Guest"};
  }
  ngOnInit() {
  }

}
