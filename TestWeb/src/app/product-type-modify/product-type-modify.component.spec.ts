import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypeModifyComponent } from './product-type-modify.component';

describe('ProductTypeModifyComponent', () => {
  let component: ProductTypeModifyComponent;
  let fixture: ComponentFixture<ProductTypeModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTypeModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTypeModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
