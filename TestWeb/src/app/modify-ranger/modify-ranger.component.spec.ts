import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyRangerComponent } from './modify-ranger.component';

describe('ModifyRangerComponent', () => {
  let component: ModifyRangerComponent;
  let fixture: ComponentFixture<ModifyRangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyRangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyRangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
