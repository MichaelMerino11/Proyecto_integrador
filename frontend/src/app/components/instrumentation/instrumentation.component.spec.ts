import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentationComponent } from './instrumentation.component';

describe('InstrumentationComponent', () => {
  let component: InstrumentationComponent;
  let fixture: ComponentFixture<InstrumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstrumentationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstrumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
