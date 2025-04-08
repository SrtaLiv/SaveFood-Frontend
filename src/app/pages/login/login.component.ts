import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodService } from '../../services/food.service';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private foodService: FoodService,
    private messageService: MessageService
  ) {
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.formLogin.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return;
    }

    const { email, password } = this.formLogin.value;
    this.foodService.loginUser(email, password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        // Store the JWT token
        localStorage.setItem('token', response.jwt);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Login failed. Please try again.',
        });
      }
    });
  }
}
