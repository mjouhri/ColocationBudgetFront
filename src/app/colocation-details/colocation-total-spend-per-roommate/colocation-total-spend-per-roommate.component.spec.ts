import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColocationTotalSpendPerRoommateComponent } from './colocation-total-spend-per-roommate.component';

describe('ColocationTotalSpendPerRoommateComponent', () => {
  let component: ColocationTotalSpendPerRoommateComponent;
  let fixture: ComponentFixture<ColocationTotalSpendPerRoommateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColocationTotalSpendPerRoommateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColocationTotalSpendPerRoommateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
