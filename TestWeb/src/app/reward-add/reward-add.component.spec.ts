import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardAddComponent } from './reward-add.component';

describe('RewardAddComponent', () => {
  let component: RewardAddComponent;
  let fixture: ComponentFixture<RewardAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
