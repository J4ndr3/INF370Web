import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityModComponent } from './security-mod.component';

describe('SecurityModComponent', () => {
  let component: SecurityModComponent;
  let fixture: ComponentFixture<SecurityModComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityModComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
