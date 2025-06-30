import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from '../../services/auth.service';
import { FundService } from '../../services/fund.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,  
    FormsModule,      
    HttpClientModule  
  ]
})
export class LoginComponent {
  email = '';
  password = '';
  message: string = '';

  constructor(private authService: AuthService,
    private fundService: FundService,
    private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        console.log('Login successful');
        this.message = '';
        this.fundService.getFundHouses().subscribe({
          next: (data: any) => console.log('Fund Houses:', data),
          error: (err: any) => console.error('Fund Houses error:', err)
        });
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.message = 'Invalid email or password';
        console.error('Login failed', err);
      }
    });
  }
}
