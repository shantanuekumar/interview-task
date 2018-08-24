import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedWorkComponent } from './featured-work.component';

describe('FeaturedWorkComponent', () => {
  let component: FeaturedWorkComponent;
  let fixture: ComponentFixture<FeaturedWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
