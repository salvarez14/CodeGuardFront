import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ExerciseResponse } from '../../model/exercise-response';
import { ExerciseService } from '../../service/exercise.service';

@Component({
  selector: 'app-testslist',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './testslist.component.html',
  styleUrl: './testslist.component.css'
})
export class TestsListComponent implements OnInit {
  problems: ExerciseResponse[] = []; 
  filteredProblems: ExerciseResponse[] = []; 

  searchKeyword: string = ''; 
  searchType: string = 'title';
  username: string = localStorage.getItem("loggedUsername") || ""; 

  constructor(private exerciseService: ExerciseService, private router: Router) {}

  ngOnInit(): void {
    if(localStorage.getItem("JWT")){
      this.exerciseService.getProblems().subscribe({
        next: (data) => {
          console.log("Problemas: ", data);
          this.problems = data.filter(problem => problem.tester === null);
          this.filteredProblems = this.problems;
          console.log("Problemas filtrados: ", this.problems);
        },
        error: (error) => {
          console.error('Error al obtener los problemas:', error);
        },
      });
    }else{
      this.router.navigate(['/login']);
    }
  }
  
  onSearch(): void {
    if (this.searchType === 'own') {
      this.filteredProblems = this.problems.filter(problem => 
        problem.creator.toLowerCase() === this.username.toLowerCase() &&
        problem.title.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    } else {
      if (!this.searchKeyword.trim()) {
        this.filteredProblems = this.problems;
        return;
      }
      this.filteredProblems = this.problems.filter((problem) => {
        switch (this.searchType) {
          case 'title':
            return problem.title.toLowerCase().includes(this.searchKeyword.toLowerCase());
          case 'creator':
            return problem.creator.toLowerCase().includes(this.searchKeyword.toLowerCase());
          default:
            return false;
        }
      });
    }
  }
}
