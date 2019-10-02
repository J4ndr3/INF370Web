import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsReportComponent } from './rewards-report.component';

describe('RewardsReportComponent', () => {
  let component: RewardsReportComponent;
  let fixture: ComponentFixture<RewardsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
