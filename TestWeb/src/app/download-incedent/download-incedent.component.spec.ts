import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadIncedentComponent } from './download-incedent.component';

describe('DownloadIncedentComponent', () => {
  let component: DownloadIncedentComponent;
  let fixture: ComponentFixture<DownloadIncedentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadIncedentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadIncedentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
