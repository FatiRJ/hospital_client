import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Promise } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  tokenValido(): boolean {
    const token = localStorage.getItem('token'); // Obtén el token almacenado en el localStorage o donde lo hayas guardado
    if (token) {
      // Realiza la petición HTTP a la API para verificar la validez del token
      // Puedes ajustar la URL y el formato de respuesta según tu API
      return this.http.post<any>('https://ejemplo.com/verificar-token', { token }).toPromise()
        .then(response => {
          // El token es válido
          return true;
        })
        .catch(error => {
          // El token no es válido
          return false;
        });
    } else {
      return false; // No hay token almacenado, por lo tanto no es válido
    }
  }
}
