import { Component, OnInit } from '@angular/core';

import { UserService } from '../service/user.service';
import { FormsModule } from '@angular/forms';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { UserInfo } from '../model/user-info';
import { ExerciseService } from '../service/exercise.service';
import { ExerciseResponse } from '../model/exercise-response';

@Component({
  selector: 'app-userpage',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.css'
})
export class UserPageComponent implements OnInit {
  user: UserInfo = {
    username: '',
    tester: false,
    creator: false,
    exercises: []
  };

  adminCheck:string = "";

  exercisenames: ExerciseResponse[] = [];

  constructor(
    private userservice: UserService,
    private router: Router,
    private authservice: AuthService,
    private exerciseservice: ExerciseService,
    private route: ActivatedRoute,
    
  ) {}

  ngOnInit(): void {
    const admin = localStorage.getItem("admin");
    const id = this.route.snapshot.paramMap.get('id');

    if (id && admin ) {
      this.adminCheck = admin;
      this.userservice.getUser(id).subscribe({
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
    }
  }

  deleteThisUser(): void {
    this.userservice.deleteUser(this.user.username).subscribe({
      next: (response) => {
        localStorage.clear();
        console.log("Deleted user:", response);
        this.authservice.setLoggedIn(true);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error("Can't delete the user:", error);
      }
    });
  }
}
