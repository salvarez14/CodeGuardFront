import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisePageSolutionsComponent } from './exercisepagesolutions.component';

describe('ExercisepagesolutionsComponent', () => {
  let component: ExercisePageSolutionsComponent;
  let fixture: ComponentFixture<ExercisePageSolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExercisePageSolutionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExercisePageSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
