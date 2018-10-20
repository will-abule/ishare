import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonSlidersComponent } from './lesson-sliders.component';

describe('LessonSlidersComponent', () => {
  let component: LessonSlidersComponent;
  let fixture: ComponentFixture<LessonSlidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonSlidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonSlidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
