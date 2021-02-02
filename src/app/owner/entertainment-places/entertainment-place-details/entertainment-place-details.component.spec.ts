import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntertainmentPlaceDetailsComponent } from './entertainment-place-details.component';

describe('EntertainmentPlaceDetailsComponent', () => {
  let component: EntertainmentPlaceDetailsComponent;
  let fixture: ComponentFixture<EntertainmentPlaceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntertainmentPlaceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntertainmentPlaceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
