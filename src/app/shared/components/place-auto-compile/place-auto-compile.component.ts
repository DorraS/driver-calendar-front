import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter, switchMap } from 'rxjs/operators';
import { GooglePlaceService } from '@shared/services/google-place.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'place-auto-compile',
  templateUrl: './place-auto-compile.component.html',
  styleUrls: ['./place-auto-compile.component.sass']
})
export class PlaceAutoCompileComponent implements OnInit {

  public model: any;
  formatter = (result: string) => result.toUpperCase();

  constructor(private googleService: GooglePlaceService) { }

  ngOnInit() {
  }

  search = (text$: Observable<string>): Observable<string[]> =>
    text$.pipe(
      filter((searchText: string) => searchText.trim().length > 1),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap( term => this.googleService.findPlacesPropositons(term))
    )
}
