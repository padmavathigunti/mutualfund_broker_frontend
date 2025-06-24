// src/app/components/register/register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  email = '';
  password = '';
  message = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    const payload = {
      email: this.email,
      password: this.password
    };

    this.authService.register(payload).subscribe({
      next: () => {
        this.message = 'Registration successful! Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500); // Delay of 1.5 seconds
      },
      error: () => {
        this.message = 'Registration failed. Please try again.';
      }
    });
  }
}
