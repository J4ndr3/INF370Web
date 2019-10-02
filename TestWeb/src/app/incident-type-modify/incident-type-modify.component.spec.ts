import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentTypeModifyComponent } from './incident-type-modify.component';

describe('IncidentTypeModifyComponent', () => {
  let component: IncidentTypeModifyComponent;
  let fixture: ComponentFixture<IncidentTypeModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentTypeModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentTypeModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
