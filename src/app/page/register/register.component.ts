import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserRequest } from '../../model/user-request';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  signupForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,}\w*$/)],],
    password: ['', Validators.required],
    confirm: ['', Validators.required],
  });

  confirmPassword: string = '';
  registeredUsernameError:boolean = false;

  onSubmit() {
    if (this.signupForm.valid && this.signupForm.value.password === this.signupForm.value.confirm) {
        console.log(`Sending data: ${JSON.stringify(this.signupForm.value)}`);
        let signupRequest: UserRequest = {
          username: this.signupForm.value.username,
          password: this.signupForm.value.password,
        };

        this.userService.registerUser(signupRequest).subscribe(
          response => {
            console.log(`Api response ${response}`);
            this.signupForm.reset();
            this.router.navigate(['/login']);
          },
          error => {
            console.error(`Error: ${error}`);
            this.signupForm.reset();
            this.registeredUsernameError = true;
          }
        );
    }
  }
}
