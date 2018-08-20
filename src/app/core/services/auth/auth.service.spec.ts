import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from '@core/services/auth/auth.service';

describe('AuthentifationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
