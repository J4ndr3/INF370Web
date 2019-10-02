import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadRewardsComponent } from './download-rewards.component';

describe('DownloadRewardsComponent', () => {
  let component: DownloadRewardsComponent;
  let fixture: ComponentFixture<DownloadRewardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadRewardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
