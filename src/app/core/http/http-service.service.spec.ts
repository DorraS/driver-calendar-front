import { TestBed, inject } from '@angular/core/testing';

import { HttpService } from '@core/http/http.service';

describe('HttpServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpService]
    });
  });

  it('should be created', inject([HttpService], (service: HttpService<String, String>) => {
    expect(service).toBeTruthy();
  }));
});
