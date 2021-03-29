import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractBarChartComponent } from './abstract-bar-chart.component';

describe('AbstractBarChartComponent', () => {
  let component: AbstractBarChartComponent;
  let fixture: ComponentFixture<AbstractBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbstractBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
