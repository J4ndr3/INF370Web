import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPassworComponent } from './reset-passwor.component';

describe('ResetPassworComponent', () => {
  let component: ResetPassworComponent;
  let fixture: ComponentFixture<ResetPassworComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPassworComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPassworComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
