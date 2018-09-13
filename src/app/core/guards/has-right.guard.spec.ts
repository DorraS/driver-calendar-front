import { TestBed, async, inject } from '@angular/core/testing';

import { HasRightGuard } from './has-right.guard';

describe('HasRightGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HasRightGuard]
    });
  });

  it('should ...', inject([HasRightGuard], (guard: HasRightGuard) => {
    expect(guard).toBeTruthy();
  }));
});
