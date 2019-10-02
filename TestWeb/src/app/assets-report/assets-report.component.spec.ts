import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsReportComponent } from './assets-report.component';

describe('AssetsReportComponent', () => {
  let component: AssetsReportComponent;
  let fixture: ComponentFixture<AssetsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
