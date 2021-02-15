import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionMarkInfoComponent } from './question-mark-info.component';

describe('QuestionMarkInfoComponent', () => {
  let component: QuestionMarkInfoComponent;
  let fixture: ComponentFixture<QuestionMarkInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionMarkInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionMarkInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
