import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractPieChartComponent } from './abstract-pie-chart.component';

describe('AbstractPieChartComponent', () => {
  let component: AbstractPieChartComponent;
  let fixture: ComponentFixture<AbstractPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbstractPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
