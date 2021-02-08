import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractSearchComponent } from './abstract-search.component';

describe('AbstractSearchComponent', () => {
  let component: AbstractSearchComponent;
  let fixture: ComponentFixture<AbstractSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbstractSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
