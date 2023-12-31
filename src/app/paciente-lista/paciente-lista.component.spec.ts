import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PacienteListaComponent } from './paciente-lista.component';

describe('PacienteListaComponent', () => {
  let component: PacienteListaComponent;
  let fixture: ComponentFixture<PacienteListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PacienteListaComponent]
    });
    fixture = TestBed.createComponent(PacienteListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
