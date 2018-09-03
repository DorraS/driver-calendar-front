import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  showAdminSubMenu = false;

  ngOnInit() {
  }


  showAdminMenu() {
    this.showAdminSubMenu = !this.showAdminSubMenu;
  }

}