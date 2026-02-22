import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { touristOwnerGuard } from './tourist-owner.guard';

describe('touristOwnerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => touristOwnerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
