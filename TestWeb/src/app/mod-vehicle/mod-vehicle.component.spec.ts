import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModVehicleComponent } from './mod-vehicle.component';

describe('ModVehicleComponent', () => {
  let component: ModVehicleComponent;
  let fixture: ComponentFixture<ModVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
