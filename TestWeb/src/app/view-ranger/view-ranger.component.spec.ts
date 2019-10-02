import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRangerComponent } from './view-ranger.component';

describe('ViewRangerComponent', () => {
  let component: ViewRangerComponent;
  let fixture: ComponentFixture<ViewRangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
