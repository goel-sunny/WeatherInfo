import { TestBed, inject } from '@angular/core/testing';

import { WeatherRequestService } from './weather-request.service';

describe('WeatherRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherRequestService]
    });
  });

  it('should be created', inject([WeatherRequestService], (service: WeatherRequestService) => {
    expect(service).toBeTruthy();
  }));
});
