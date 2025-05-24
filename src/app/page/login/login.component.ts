import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRequest } from '../../model/user-request';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  loginForm = this.fb.group({
    username: ['',[Validators.required, Validators.pattern(/^[a-zA-Z]{3,}\w*$/)],],
    password: ['', Validators.required],
  });

  invalidCredentials:boolean = false;

  onSubmit(){
    if (this.loginForm.valid){
      let signupRequest: UserRequest = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };

      this.userService.loginUser(signupRequest).subscribe(
        response=>{
          console.log(`Cuerpo de la respuesta API: ${response.body}`);
          if (response.headers.get('Authorization')) {
            localStorage.setItem('JWT', response.headers.get('Authorization'));
            localStorage.setItem('loggedUsername', response.body.username);
            this.userService.getUser(response.body.username).subscribe(
              response=>{
                console.log(response)
                localStorage.setItem('tester', response.tester.toString());
                localStorage.setItem('creator', response.creator.toString());
                //Se establece que esta logeado para actualizar la parte de la izquierda del header
                this.authService.setLoggedIn(true); 
              },
              error=>{
                console.error(`Error trying to search the user: ${error}`)
              }
            )
            localStorage.setItem('admin', response.body.admin.toString());
            //Se establece que esta logeado para actualizar la parte de la derecha del header
            this.authService.setLoggedIn(true);
            this.loginForm.reset();
            this.router.navigate(['/']);
          } //Aqui no hay else porque siempre recive algo por Authorization si no esta correcto va al canal de errores
        },
        error =>{
          this.invalidCredentials=true;
          this.loginForm.reset();
          console.error(`Error: ${error}`);
        }
      );
    }
  }
}
