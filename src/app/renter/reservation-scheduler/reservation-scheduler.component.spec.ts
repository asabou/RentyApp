import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSchedulerComponent } from './reservation-scheduler.component';

describe('ReservationSchedulerComponent', () => {
  let component: ReservationSchedulerComponent;
  let fixture: ComponentFixture<ReservationSchedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationSchedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
