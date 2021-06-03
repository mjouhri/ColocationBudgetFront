import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColocationDetailsComponent } from './colocation-details.component';

describe('ColocationDetailsComponent', () => {
  let component: ColocationDetailsComponent;
  let fixture: ComponentFixture<ColocationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColocationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColocationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
