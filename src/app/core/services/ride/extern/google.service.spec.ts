import { TestBed, inject } from '@angular/core/testing';

import { GoogleService } from '@core/services/ride/extern/google.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('GoogleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        // no more boilerplate code w/ custom providers needed :-)
        HttpClientModule,
      ],
      providers: [GoogleService, HttpClient]
    });
  });

  it('should be created', inject([GoogleService, HttpClient], (service: GoogleService, http: HttpClient) => {
       console.log('_----------------------------------------------------------------');
       const estimate = service.estimateRide('33 rue de la chine, 75020, Paris' , '1 rue pierre mendes france, 57000, Metz', Date.now());
       estimate.subscribe(data => console.log(data));
      }));
});
