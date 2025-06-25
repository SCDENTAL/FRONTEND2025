import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearturnodialogComponent } from './crearturnodialog.component';

describe('CrearturnodialogComponent', () => {
  let component: CrearturnodialogComponent;
  let fixture: ComponentFixture<CrearturnodialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearturnodialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearturnodialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
