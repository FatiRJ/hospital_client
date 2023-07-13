//importamos OnInit
import { Component, OnInit } from '@angular/core';
//importamos HttpClient
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
//importamo el modal
import { DefaultModalComponent} from '../DefaultsComponents/default-modal/default-modal.component';
import { Timestamp } from 'rxjs';

//creamos la interface
export interface Paciente {
  paciente_id?: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  pais: string;
  telefono: string;
  fecha_nacimiento: Date;
}

@Component({
  selector: 'app-paciente-lista',
  templateUrl: './paciente-lista.component.html',
  styleUrls: ['./paciente-lista.component.scss'],
})

export class PacienteListaComponent implements OnInit {
  // Propiedad para almacenar los datos de las pacientes
  pacientes: any[] = [];

  //creamos un constructor
  //private dialog: MatDialog
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  //con el OnInit hacemos el get de la api
  ngOnInit() {
    this.http
      .get('http://192.168.1.33:8000/api/pacientes')
      .subscribe((data: any) => {
        this.pacientes = data.data;
        console.log(data);
      });
  }

  //Creamos la funcion crear 
  openCreateModal() {
    const dialogRef = this.dialog.open(DefaultModalComponent, {
      data: { action: 'create' },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Se ha guardado una nueva paciente, realiza las acciones necesarias, como enviar una solicitud HTTP para guardarla en el servidor
        const nuevaPaciente: Paciente = {
          //nombres de la base de datos
          nombre: result.nombre,
          direccion: result.direccion,
          ciudad: result.ciudad,
          pais: result.pais,
          telefono: result.telefono,
          fecha_nacimiento: result.fecha_nacimiento
        };
  
        // Envía la solicitud HTTP para guardar la nueva paciente
        this.http.post('http://192.168.1.33:8000/api/pacientes', nuevaPaciente)
          .subscribe((response: any) => {
            // Actualiza la lista de pacientes con la respuesta del servidor
            this.pacientes.push(response.data);
          });
      }
    });
  }
  
  
  //creamos la funcion para abrir el modal
  openEditModal(paciente: Paciente) {
    const dialogRef = this.dialog.open(DefaultModalComponent, {
      data: {
        action: 'edit',
        nombre: paciente.nombre,
          direccion: paciente.direccion,
          ciudad: paciente.ciudad,
          pais: paciente.pais,
          telefono: paciente.telefono,
          fecha_nacimiento: paciente.fecha_nacimiento
      },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Se ha guardado la edición de la paciente, realiza las acciones necesarias, como enviar una solicitud HTTP para actualizarla en el servidor
        const pacienteEditada: Paciente = {
          //nombres de la base de datos
          nombre: result.nombre,
          direccion: result.direccion,
          ciudad: result.ciudad,
          pais: result.pais,
          telefono: result.telefono,
          fecha_nacimiento: result.fecha_nacimiento
        };
  
        // Envía la solicitud HTTP para actualizar la paciente en la ruta correspondiente (por ejemplo, 'http://127.0.0.1:8000/api/v1.0/paciente/123')
        this.http.put(`http://192.168.1.33:8000/api/pacientes/update/${paciente.paciente_id}`, pacienteEditada)
          .subscribe((response: any) => {
            // Actualiza la lista de pacientes con la respuesta del servidor
            const pacienteActualizada = response.data;
            const index = this.pacientes.findIndex(p => p.id === pacienteActualizada.id);
            if (index !== -1) {
              this.pacientes[index] = pacienteActualizada;
            }
          });
      }
    });
  }

  //creamos la funcion para eliminar la paciente
  deletePaciente(paciente: Paciente) {
    this.http.delete(`http://192.168.1.33:8000/api/pacientes${paciente.paciente_id}`)
      .subscribe(() => {
        // Elimina la paciente de la lista local
        this.pacientes = this.pacientes.filter(p => p.id !== paciente.paciente_id);
      });
  }
  
  
  
}
