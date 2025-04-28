import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesDialogComponent } from './pacientes-dialog.component';

describe('PacientesDialogComponent', () => {
  let component: PacientesDialogComponent;
  let fixture: ComponentFixture<PacientesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacientesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
