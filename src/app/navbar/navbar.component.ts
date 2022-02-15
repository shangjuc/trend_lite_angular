import { Component, OnInit } from '@angular/core';
import { search_config } from '../app.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  search_config = search_config;

  ngOnInit(): void {
  }

}
