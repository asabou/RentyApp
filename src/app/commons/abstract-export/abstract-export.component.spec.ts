import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractExportComponent } from './abstract-export.component';

describe('AbstractExportComponent', () => {
  let component: AbstractExportComponent;
  let fixture: ComponentFixture<AbstractExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbstractExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
