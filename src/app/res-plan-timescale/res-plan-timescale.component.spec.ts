import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResPlanTimescaleComponent } from './res-plan-timescale.component';

describe('ResPlanTimescaleComponent', () => {
  let component: ResPlanTimescaleComponent;
  let fixture: ComponentFixture<ResPlanTimescaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResPlanTimescaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResPlanTimescaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
