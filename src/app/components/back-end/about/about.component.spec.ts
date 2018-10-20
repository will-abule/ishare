import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AdminAboutComponent;
  let fixture: ComponentFixture<AdminAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
