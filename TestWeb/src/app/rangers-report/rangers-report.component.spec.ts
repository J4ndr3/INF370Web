import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangersReportComponent } from './rangers-report.component';

describe('RangersReportComponent', () => {
  let component: RangersReportComponent;
  let fixture: ComponentFixture<RangersReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangersReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
