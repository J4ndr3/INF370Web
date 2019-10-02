import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTypeModifyComponent } from './event-type-modify.component';

describe('EventTypeModifyComponent', () => {
  let component: EventTypeModifyComponent;
  let fixture: ComponentFixture<EventTypeModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventTypeModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTypeModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
