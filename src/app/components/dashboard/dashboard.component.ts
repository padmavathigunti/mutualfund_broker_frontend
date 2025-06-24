// src/app/components/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FundService } from '../../services/fund.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DashboardComponent implements OnInit {
  fundHouses: any[] = [];
  schemes: any[] = [];
  portfolio: any[] = [];
  selectedFundHouseId: string = '';
  selectedSchemeId: string = '';
  units: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fundService: FundService
  ) {}

  ngOnInit() {
    this.loadFundHouses();
    this.loadPortfolio();
  }

  loadFundHouses() {
    this.fundService.getFundHouses().subscribe({
      next: (res) => {
        if (res.status) {
          this.fundHouses = res.data;
        } else {
          console.error('Failed to fetch fund houses:', res.message);
        }
      },
      error: (err) => console.error('Error loading fund houses:', err)
    });
  }

  onFundHouseChange(event: any) {
    this.selectedFundHouseId = event.target.value;
    this.selectedSchemeId = '';
    this.schemes = [];

    if (this.selectedFundHouseId) {
      this.fundService.getSchemesByFundHouse(this.selectedFundHouseId).subscribe({
        next: (data: any[]) => {
          console.log('Schemes fetched:', data);
          this.schemes = data;
        },
        error: (err) => console.error('Error loading schemes:', err)
      });
    }
  }

  addToPortfolio() {
    if (this.selectedSchemeId && this.units > 0) {
      const portfolioItem = {
        scheme: this.selectedSchemeId,
        units: this.units
      };

      this.fundService.addToPortfolio(portfolioItem).subscribe({
        next: (res) => {
          if (res.status) {
            console.log('Added to portfolio:', res.data);
            this.loadPortfolio();
            this.units = 0;
            this.selectedSchemeId = '';
          } else {
            console.error('Failed to add to portfolio:', res.message);
          }
        },
        error: (err) => console.error('Error adding to portfolio:', err)
      });
    }
  }

  loadPortfolio() {
    this.fundService.getPortfolio().subscribe({
      next: (res) => {
        if (res.status) {
          this.portfolio = res.data;
        } else {
          console.error('Failed to fetch portfolio:', res.message);
        }
      },
      error: (err) => console.error('Error loading portfolio:', err)
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
