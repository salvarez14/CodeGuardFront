import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SolutionObjResponse } from '../../model/solution-obj-response';
import { ExerciseService } from '../../service/exercise.service';


@Component({
  selector: 'app-exercisepagesolutions',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './exercisepagesolutions.component.html',
  styleUrls: ['./exercisepagesolutions.component.css']
})
export class ExercisePageSolutionsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private exerciseService: ExerciseService, private router: Router) {}

  problems: SolutionObjResponse[] = [];
  id: string = "";
  title: string = "";

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    if(!localStorage.getItem("JWT")){
      this.router.navigate(['/login']);
    }
    if (routeId) {
      this.id = routeId;
      this.exerciseService.getSolutions(routeId).subscribe({
        next: (data) => {
          data.forEach(element=>{
            this.problems.push(element);
          })
          console.log('Soluciones del problema:', this.problems);
        },
        error: (error) => {
          console.error('Error al obtener las soluciones del problema:', error);
        }
      });
      
      this.exerciseService.getProblem(routeId).subscribe({
        next: (data) => {
          this.title = data.title;
          console.log('Datos del problema:', data);
        },
        error: (error) => {
          console.error('Error al obtener los datos del problema:', error);
        }
      });
    }
  }

 
}
