import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reserve2Component } from './reserve2.component';

describe('Reserve2Component', () => {
  let component: Reserve2Component;
  let fixture: ComponentFixture<Reserve2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reserve2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Reserve2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
