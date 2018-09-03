import { TestBed, inject } from '@angular/core/testing';

import { GoogleService } from '@shared/services/google.service';

describe('GooglePlaceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleService]
    });
  });

  it('should be created', inject([GoogleService], (service: GoogleService) => {
    expect(service).toBeTruthy();
  }));
});
