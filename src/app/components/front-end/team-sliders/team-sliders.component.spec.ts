import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSlidersComponent } from './team-sliders.component';

describe('TeamSlidersComponent', () => {
  let component: TeamSlidersComponent;
  let fixture: ComponentFixture<TeamSlidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamSlidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSlidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
