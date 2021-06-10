import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColocationFormComponent } from './colocation-form.component';

describe('ColocationFormComponent', () => {
  let component: ColocationFormComponent;
  let fixture: ComponentFixture<ColocationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColocationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColocationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
