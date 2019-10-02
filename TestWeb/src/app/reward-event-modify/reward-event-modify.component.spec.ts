import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardEventModifyComponent } from './reward-event-modify.component';

describe('RewardEventModifyComponent', () => {
  let component: RewardEventModifyComponent;
  let fixture: ComponentFixture<RewardEventModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardEventModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardEventModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
