import { TestBed } from '@angular/core/testing';

import { BalloonsService } from './balloons.service';

describe('BalloonsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BalloonsService = TestBed.get(BalloonsService);
    expect(service).toBeTruthy();
  });
});
