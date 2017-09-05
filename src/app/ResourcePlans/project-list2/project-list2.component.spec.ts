import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectList2Component } from './project-list2.component';

describe('ProjectList2Component', () => {
  let component: ProjectList2Component;
  let fixture: ComponentFixture<ProjectList2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectList2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
