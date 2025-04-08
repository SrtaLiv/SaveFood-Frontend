import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodService } from '../../services/food.service';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private foodService: FoodService,
    private messageService: MessageService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return;
    }

    const { email, username, password } = this.registerForm.value;
    this.foodService.signupUser(email, username, password).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Registro exitoso! Por favor inicie sesión.',
        });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error en el registro. Por favor intente nuevamente.',
        });
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}