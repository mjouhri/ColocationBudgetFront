import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColocationListComponent } from './colocation-list.component';

describe('ColocationListComponent', () => {
  let component: ColocationListComponent;
  let fixture: ComponentFixture<ColocationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColocationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
