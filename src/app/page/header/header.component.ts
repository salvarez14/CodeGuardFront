import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private userService: UserService, private router: Router, private fb: FormBuilder) {}
  
  user = this.fb.group({
    username: ['',[Validators.required, Validators.pattern(/^[a-zA-Z]{3,}\w*$/)],],
  });

  loggedUsername = localStorage.getItem("loggedUsername");
  loggedUser = localStorage.getItem("JWT");
  isTester = localStorage.getItem("tester");
  isCreator = localStorage.getItem("creator");

  ngOnInit(): void {
    this.loggedUsername = localStorage.getItem("loggedUsername")||"";
    this.authService.isLoggedIn$.subscribe(
      a => { if (a) this.updateHeader(); }
    );
    this.userService.getUser(this.loggedUsername).subscribe({
      next: data =>{
        localStorage.setItem("tester", data.tester.toString());
        localStorage.setItem("creator", data.creator.toString());
        this.updateHeader();
      },
      error: error=>{
        console.error("No username found");
      }
    });
  }

  updateHeader() {
    this.loggedUsername = localStorage.getItem("loggedUsername");
    this.loggedUser = localStorage.getItem("JWT");
    this.isTester = localStorage.getItem("tester");
    this.isCreator = localStorage.getItem("creator");
  }

  logout() {
    localStorage.clear();
    this.updateHeader();
  }

  onSearch() {
    if (this.user.valid && this.user.value.username){
      this.userService.getUser(this.user.value.username).subscribe({
        next: (data) => {
          console.log("Datos del usuario: ", data);
          this.user.reset();
          this.router.navigate(['/user', data.username]);
        },
        error: (error) => {
          console.error("El usuario no existe: ", error);
          //document.getElementById("search-bar")?.classList.add("search-error");
          alert("El usuario no existe");
        }
      });
    }
  }
}
