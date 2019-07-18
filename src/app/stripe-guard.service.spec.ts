import { TestBed } from '@angular/core/testing';

import { StripeGuardService } from './stripe-guard.service';

describe('StripeGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StripeGuardService = TestBed.get(StripeGuardService);
    expect(service).toBeTruthy();
  });
});
