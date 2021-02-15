import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntertainmentPlaceAddComponent } from './entertainment-place-add.component';

describe('EntertainmentPlaceAddComponent', () => {
  let component: EntertainmentPlaceAddComponent;
  let fixture: ComponentFixture<EntertainmentPlaceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntertainmentPlaceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntertainmentPlaceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
