import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumRxjsPracticeComponent } from './medium-rxjs-practice.component';

describe('MediumRxjsPracticeComponent', () => {
  let component: MediumRxjsPracticeComponent;
  let fixture: ComponentFixture<MediumRxjsPracticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediumRxjsPracticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediumRxjsPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
