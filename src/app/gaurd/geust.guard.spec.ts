import { TestBed, async, inject } from '@angular/core/testing';

import { GeustGuard } from './geust.guard';

describe('GeustGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeustGuard]
    });
  });

  it('should ...', inject([GeustGuard], (guard: GeustGuard) => {
    expect(guard).toBeTruthy();
  }));
});
