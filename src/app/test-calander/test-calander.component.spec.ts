import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCalanderComponent } from './test-calander.component';

describe('TestCalanderComponent', () => {
  let component: TestCalanderComponent;
  let fixture: ComponentFixture<TestCalanderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCalanderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCalanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
