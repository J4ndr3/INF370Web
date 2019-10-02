import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessLevelModComponent } from './access-level-mod.component';

describe('AccessLevelModComponent', () => {
  let component: AccessLevelModComponent;
  let fixture: ComponentFixture<AccessLevelModComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessLevelModComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessLevelModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
