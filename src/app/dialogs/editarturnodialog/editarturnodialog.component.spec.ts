import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarturnodialogComponent } from './editarturnodialog.component';

describe('EditarturnodialogComponent', () => {
  let component: EditarturnodialogComponent;
  let fixture: ComponentFixture<EditarturnodialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarturnodialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarturnodialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
