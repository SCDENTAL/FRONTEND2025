import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObraSocialDialogComponent } from './obra-social-dialog.component';

describe('ObraSocialDialogComponent', () => {
  let component: ObraSocialDialogComponent;
  let fixture: ComponentFixture<ObraSocialDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObraSocialDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObraSocialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
