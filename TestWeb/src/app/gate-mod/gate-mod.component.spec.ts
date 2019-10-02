import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GateModComponent } from './gate-mod.component';

describe('GateModComponent', () => {
  let component: GateModComponent;
  let fixture: ComponentFixture<GateModComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GateModComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GateModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
