import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsListComponent } from './testslist.component';

describe('TestsListComponent', () => {
  let component: TestsListComponent;
  let fixture: ComponentFixture<TestsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
