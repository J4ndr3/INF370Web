import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveModComponent } from './reserve-mod.component';

describe('ReserveModComponent', () => {
  let component: ReserveModComponent;
  let fixture: ComponentFixture<ReserveModComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveModComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
