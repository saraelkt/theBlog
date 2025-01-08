import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteSectionComponent } from './write-section.component';

describe('WriteSectionComponent', () => {
  let component: WriteSectionComponent;
  let fixture: ComponentFixture<WriteSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
