import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntertainmentActivityAddComponent } from './entertainment-activity-add.component';

describe('EntertainmentActivityAddComponent', () => {
  let component: EntertainmentActivityAddComponent;
  let fixture: ComponentFixture<EntertainmentActivityAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntertainmentActivityAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntertainmentActivityAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
