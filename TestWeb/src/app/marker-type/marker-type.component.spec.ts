import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerTypeComponent } from './marker-type.component';

describe('MarkerTypeComponent', () => {
  let component: MarkerTypeComponent;
  let fixture: ComponentFixture<MarkerTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkerTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
