import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntertainmentActivityEditComponent } from './entertainment-activity-edit.component';

describe('EntertainmentActivityEditComponent', () => {
  let component: EntertainmentActivityEditComponent;
  let fixture: ComponentFixture<EntertainmentActivityEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntertainmentActivityEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntertainmentActivityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
