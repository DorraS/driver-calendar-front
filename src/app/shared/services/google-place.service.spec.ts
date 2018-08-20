import { TestBed, inject } from '@angular/core/testing';

import { GooglePlaceService } from './google-place.service';

describe('GooglePlaceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GooglePlaceService]
    });
  });

  it('should be created', inject([GooglePlaceService], (service: GooglePlaceService) => {
    expect(service).toBeTruthy();
  }));
});
