import { TestBed, inject } from '@angular/core/testing';

import { TypeConversionService } from './type-conversion.service';

describe('TypeConversionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeConversionService]
    });
  });

  it('should be created', inject([TypeConversionService], (service: TypeConversionService) => {
    expect(service).toBeTruthy();
  }));
});
