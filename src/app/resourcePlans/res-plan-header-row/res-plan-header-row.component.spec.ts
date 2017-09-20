import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResPlanHeaderRowComponent } from './res-plan-header-row.component';

describe('ResPlanHeaderRowComponent', () => {
  let component: ResPlanHeaderRowComponent;
  let fixture: ComponentFixture<ResPlanHeaderRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResPlanHeaderRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResPlanHeaderRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
