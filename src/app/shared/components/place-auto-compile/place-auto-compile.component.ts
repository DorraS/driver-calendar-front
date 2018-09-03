import { Component, OnInit } from '@angular/core';
import { GoogleService, Place } from '@shared/services/google.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'place-auto-compile',
  templateUrl: './place-auto-compile.component.html',
  styleUrls: ['./place-auto-compile.component.sass']
})
export class PlaceAutoCompileComponent implements OnInit {

  public model: any;
  formatter = (result: string) => result.toUpperCase();

  constructor(private googleService: GoogleService) { }

  ngOnInit() {
  }

  search = (text$: Observable<string>): Observable<Place[]> =>
    text$.pipe(
      filter((searchText: string) => searchText.trim().length > 1),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap( term => this.googleService.findPlacesPropositons(term))
    )
}
