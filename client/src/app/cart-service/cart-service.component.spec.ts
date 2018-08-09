import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartServiceComponent } from './cart-service.component';

describe('CartServiceComponent', () => {
  let component: CartServiceComponent;
  let fixture: ComponentFixture<CartServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
