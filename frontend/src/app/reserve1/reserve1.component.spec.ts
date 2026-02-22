import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reserve1Component } from './reserve1.component';

describe('Reserve1Component', () => {
  let component: Reserve1Component;
  let fixture: ComponentFixture<Reserve1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reserve1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Reserve1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
