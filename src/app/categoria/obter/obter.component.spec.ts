import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObterComponent } from './obter.component';

describe('ObterComponent', () => {
  let component: ObterComponent;
  let fixture: ComponentFixture<ObterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
