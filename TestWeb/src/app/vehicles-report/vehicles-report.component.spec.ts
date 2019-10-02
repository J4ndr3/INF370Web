import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesReportComponent } from './vehicles-report.component';

describe('VehiclesReportComponent', () => {
  let component: VehiclesReportComponent;
  let fixture: ComponentFixture<VehiclesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
