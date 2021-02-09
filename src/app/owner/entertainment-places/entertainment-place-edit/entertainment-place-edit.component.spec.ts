import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntertainmentPlaceEditComponent } from './entertainment-place-edit.component';

describe('EntertainmentPlaceEditComponent', () => {
  let component: EntertainmentPlaceEditComponent;
  let fixture: ComponentFixture<EntertainmentPlaceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntertainmentPlaceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntertainmentPlaceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
