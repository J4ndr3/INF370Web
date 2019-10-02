import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentLevelComponent } from './incident-level.component';

describe('IncidentLevelComponent', () => {
  let component: IncidentLevelComponent;
  let fixture: ComponentFixture<IncidentLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
