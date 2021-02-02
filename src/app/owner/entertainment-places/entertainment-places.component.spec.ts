import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntertainmentPlacesComponent } from './entertainment-places.component';

describe('EntertainmentPlacesComponent', () => {
  let component: EntertainmentPlacesComponent;
  let fixture: ComponentFixture<EntertainmentPlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntertainmentPlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntertainmentPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
