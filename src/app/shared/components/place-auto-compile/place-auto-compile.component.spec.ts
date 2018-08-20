import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceAutoCompileComponent } from './place-auto-compile.component';

describe('PlaceAutoCompileComponent', () => {
  let component: PlaceAutoCompileComponent;
  let fixture: ComponentFixture<PlaceAutoCompileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceAutoCompileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceAutoCompileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
