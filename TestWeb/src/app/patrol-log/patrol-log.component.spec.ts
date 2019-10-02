import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrolLogComponent } from './patrol-log.component';

describe('PatrolLogComponent', () => {
  let component: PatrolLogComponent;
  let fixture: ComponentFixture<PatrolLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatrolLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatrolLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
