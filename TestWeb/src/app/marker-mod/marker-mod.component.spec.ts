import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerModComponent } from './marker-mod.component';

describe('MarkerModComponent', () => {
  let component: MarkerModComponent;
  let fixture: ComponentFixture<MarkerModComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkerModComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
