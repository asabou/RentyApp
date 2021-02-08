import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntertainmentPlaceSearchComponent } from './entertainment-place-search.component';

describe('EntertainmentPlaceSearchComponent', () => {
  let component: EntertainmentPlaceSearchComponent;
  let fixture: ComponentFixture<EntertainmentPlaceSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntertainmentPlaceSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntertainmentPlaceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
