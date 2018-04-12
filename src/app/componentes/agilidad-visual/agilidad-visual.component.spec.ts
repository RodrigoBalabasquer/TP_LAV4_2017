import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgilidadVisualComponent } from './agilidad-visual.component';

describe('AgilidadVisualComponent', () => {
  let component: AgilidadVisualComponent;
  let fixture: ComponentFixture<AgilidadVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgilidadVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgilidadVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
