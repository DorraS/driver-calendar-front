import { TestBed, inject } from '@angular/core/testing';

import { TyperideService } from './typeride.service';

describe('TyperideService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TyperideService]
    });
  });

  it('should be created', inject([TyperideService], (service: TyperideService) => {
    expect(service).toBeTruthy();
  }));
});
