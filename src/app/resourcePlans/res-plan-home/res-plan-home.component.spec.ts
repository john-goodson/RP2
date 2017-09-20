import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResPlanHomeComponent } from './res-plan-home.component';

describe('ResPlanHomeComponent', () => {
  let component: ResPlanHomeComponent;
  let fixture: ComponentFixture<ResPlanHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResPlanHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResPlanHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
