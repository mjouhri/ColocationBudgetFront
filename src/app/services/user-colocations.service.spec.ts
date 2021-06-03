import { TestBed } from '@angular/core/testing';

import { UserColocationsService } from './user-colocations.service';

describe('UserColocationsService', () => {
  let service: UserColocationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserColocationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
