import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResPlanWorkunitsComponent } from './res-plan-workunits.component';

describe('ResPlanWorkunitsComponent', () => {
  let component: ResPlanWorkunitsComponent;
  let fixture: ComponentFixture<ResPlanWorkunitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResPlanWorkunitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResPlanWorkunitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
