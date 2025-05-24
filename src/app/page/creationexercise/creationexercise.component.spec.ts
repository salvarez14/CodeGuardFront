import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationExerciseComponent } from './creationexercise.component';

describe('CreationExerciseComponent', () => {
  let component: CreationExerciseComponent;
  let fixture: ComponentFixture<CreationExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationExerciseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
