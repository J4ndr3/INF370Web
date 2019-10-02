import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkersReportComponent } from './markers-report.component';

describe('MarkersReportComponent', () => {
  let component: MarkersReportComponent;
  let fixture: ComponentFixture<MarkersReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkersReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
