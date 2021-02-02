import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntertainmentActvityComponent } from './entertainment-actvity.component';

describe('EntertainmentActvityComponent', () => {
  let component: EntertainmentActvityComponent;
  let fixture: ComponentFixture<EntertainmentActvityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntertainmentActvityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntertainmentActvityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
