import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueVesComponent } from './que-ves.component';

describe('QueVesComponent', () => {
  let component: QueVesComponent;
  let fixture: ComponentFixture<QueVesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueVesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueVesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
