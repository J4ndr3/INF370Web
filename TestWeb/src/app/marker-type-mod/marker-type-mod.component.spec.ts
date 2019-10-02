import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerTypeModComponent } from './marker-type-mod.component';

describe('MarkerTypeModComponent', () => {
  let component: MarkerTypeModComponent;
  let fixture: ComponentFixture<MarkerTypeModComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkerTypeModComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerTypeModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
