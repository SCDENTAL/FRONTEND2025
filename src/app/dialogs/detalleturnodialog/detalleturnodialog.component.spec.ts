import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleturnodialogComponent } from './detalleturnodialog.component';

describe('DetalleturnodialogComponent', () => {
  let component: DetalleturnodialogComponent;
  let fixture: ComponentFixture<DetalleturnodialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleturnodialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleturnodialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
