import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentLevelModifyComponent } from './incident-level-modify.component';

describe('IncidentLevelModifyComponent', () => {
  let component: IncidentLevelModifyComponent;
  let fixture: ComponentFixture<IncidentLevelModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentLevelModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentLevelModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
