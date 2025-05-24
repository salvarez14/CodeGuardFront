import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisePageComponent } from './exercisepage.component';

describe('ExercisepageComponent', () => {
  let component: ExercisePageComponent;
  let fixture: ComponentFixture<ExercisePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExercisePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExercisePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
