import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcastWeatherComponent } from './forcast-weather.component';

describe('ForcastWeatherComponent', () => {
  let component: ForcastWeatherComponent;
  let fixture: ComponentFixture<ForcastWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForcastWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForcastWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
