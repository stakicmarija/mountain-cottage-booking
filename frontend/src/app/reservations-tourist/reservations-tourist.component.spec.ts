import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsTouristComponent } from './reservations-tourist.component';

describe('ReservationsTouristComponent', () => {
  let component: ReservationsTouristComponent;
  let fixture: ComponentFixture<ReservationsTouristComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationsTouristComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsTouristComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
