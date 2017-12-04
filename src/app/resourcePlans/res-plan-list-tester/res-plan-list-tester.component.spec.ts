import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResPlanListTesterComponent } from './res-plan-list-tester.component';

describe('ResPlanListTesterComponent', () => {
  let component: ResPlanListTesterComponent;
  let fixture: ComponentFixture<ResPlanListTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResPlanListTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResPlanListTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
