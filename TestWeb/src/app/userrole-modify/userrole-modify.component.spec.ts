import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserroleModifyComponent } from './userrole-modify.component';

describe('UserroleModifyComponent', () => {
  let component: UserroleModifyComponent;
  let fixture: ComponentFixture<UserroleModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserroleModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserroleModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
