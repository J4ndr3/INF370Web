import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardModifyComponent } from './reward-modify.component';

describe('RewardModifyComponent', () => {
  let component: RewardModifyComponent;
  let fixture: ComponentFixture<RewardModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
