import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        this.authService.storeToken(res.access);
        this.router.navigate(['/dashboard']);
      },
      error: err => this.message = 'Login failed!'
    });
  }
}
