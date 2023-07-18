import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string;
  email: string;
  password: string;

  constructor(private http: HttpClient) { }

  register() {
    const newUser = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.http.post('http://127.0.0.1:8000/api/register', newUser)
      .subscribe((response: any) => {
        // Aquí puedes manejar la respuesta del servidor después de registrar al usuario
        // Por ejemplo, puedes guardar el token en el almacenamiento local (localStorage) para futuras solicitudes
        const token = response.token;
        localStorage.setItem('token', token);

        // También puedes redirigir al usuario a otra página
        // Ejemplo: this.router.navigate(['/dashboard']);
      }, (error) => {
        // Aquí puedes manejar los errores en caso de que falle el registro
        console.error(error);
      });
  }
}

