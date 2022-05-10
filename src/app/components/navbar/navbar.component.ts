import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public menu: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.menu = [
      {
        label: 'Home',
        routerLink: '/home'
      },
      {
        label: 'Assignments List',
        routerLink: '/assignments/list'
      },
      {
        label: 'New Assignment',
        routerLink: '/assignments/new'
      },
      {
        label: 'New Assignment Type',
        routerLink: '/types/new'
      },
      {
        label: 'Assignments Types List',
        routerLink: '/types/list'
      }
    ]
  }

}
