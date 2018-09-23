import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'dc-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.sass']
})
export class BackComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }
  backClicked() {
    this._location.back();
  }
}

