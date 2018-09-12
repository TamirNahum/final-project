import { Component, OnInit } from '@angular/core';
import { MyLink } from '../shared/services/my-link.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {

  link:string=MyLink.link;
  constructor() { }

  ngOnInit() {
  }

}
