import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosDialogComponent } from './empleados-dialog.component';

describe('EmpleadosDialogComponent', () => {
  let component: EmpleadosDialogComponent;
  let fixture: ComponentFixture<EmpleadosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadosDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
