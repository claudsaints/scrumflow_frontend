import { TestBed } from '@angular/core/testing';

import { DragControlService } from './drag-control.service';

describe('DragControlService', () => {
  let service: DragControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DragControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
