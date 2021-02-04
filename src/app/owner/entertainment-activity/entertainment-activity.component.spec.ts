import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntertainmentActivityComponent } from './entertainment-activity.component';

describe('EntertainmentActvityComponent', () => {
  let component: EntertainmentActivityComponent;
  let fixture: ComponentFixture<EntertainmentActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntertainmentActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntertainmentActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
