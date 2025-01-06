import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandinheaderComponent } from './landinheader.component';

describe('LandinheaderComponent', () => {
  let component: LandinheaderComponent;
  let fixture: ComponentFixture<LandinheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandinheaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandinheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
