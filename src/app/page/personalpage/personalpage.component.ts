import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ChangePasswordResponse } from '../../model/change-passwords-response';
import { ExerciseResponse } from '../../model/exercise-response';
import { UserInfo } from '../../model/user-info';
import { AuthService } from '../../service/auth.service';
import { ErrorService } from '../../service/error.service';
import { ExerciseService } from '../../service/exercise.service';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-personalpage',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './personalpage.component.html',
  styleUrls: ['./personalpage.component.css']
})
export class PersonalpageComponent implements OnInit {
  user: UserInfo = {
    username: '',
    tester: false,
    creator: false,
    exercises: []
  };

  exercisenames: ExerciseResponse[] = [];
  changeFailed: boolean = false;

  constructor(
    private userservice: UserService,
    private router: Router,
    private authservice: AuthService,
    private exerciseservice: ExerciseService,
    private fb: FormBuilder,
    private errorService: ErrorService
  ) {}

  passwords = this.fb.group({
    oldpassword: ['', Validators.required],
    newpassword: ['',Validators.required],
  });

  passwordsresponse: ChangePasswordResponse = {
    oldPassword:"",
    newPassword:"",
  };


  deleteThisUser(): void {
    this.userservice.deleteLoggedUser().subscribe({
      next: (response) => {
        localStorage.clear();
        console.log("Deleted user:", response);
        this.authservice.setLoggedIn(true);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error("Can't delete the user:", error);
        this.errorService.changeData({code: error.status, message: "Your user could not be deleted"});
        this.router.navigate(['/error']);
      }
    });
  }

  ngOnInit(): void {
    const loggedUsername = localStorage.getItem('loggedUsername');
    if (loggedUsername) {
      this.userservice.getUser(loggedUsername).subscribe({
        next: (data) => {
          this.user.username = data.username;
          this.user.tester = data.tester;
          this.user.creator = data.creator;
          this.user.exercises = data.exercises;

          for (let index = 0; index < this.user.exercises.length; index++) {
            this.exerciseservice.getProblem(this.user.exercises[index]).subscribe({
              next: (data) => {
                this.exercisenames.push(data);
                console.log('Datos del problema:', data);
              },
              error: (error) => {
                console.error('Error buscar el problema:', error);
              }
            });
          }
          console.log('Datos de usuario:', data);
        },
        error: (error) => {
          console.error('Error buscar el usuario:', error);
        }
      });
    } else {
      console.error('No se encontró el nombre de usuario en el localstorage');
      this.router.navigate(['/login']);
    }
  }

  onSubmit():void{
    this.changeFailed = false;
    if (this.passwords.valid && this.passwords.value.oldpassword && this.passwords.value.newpassword){
      this.passwordsresponse.oldPassword = this.passwords.value.oldpassword;
      this.passwordsresponse.newPassword = this.passwords.value.newpassword;
      this.userservice.updatePassword(this.passwordsresponse).subscribe({
        next: (data) => {
          console.log("Datos del usuario: ", data);
          this.passwords.reset();
        },
        error: (error) => {
          this.changeFailed = true;
          console.error("El usuario no existe: ", error); 
        }
      });
    }
  }
}
