import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FundService } from '../../services/fund.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DashboardComponent implements OnInit {
  fundHouses: any[] = [];
  schemes: any[] = [];
  portfolio: any[] = [];
  selectedFundHouseId: string = '';
  selectedSchemeId: string = '';
  amount: number = 0;

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
        if (res.statusCode) {
          this.fundHouses = res.payLoad;
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
      next: (res: any) => {
        console.log('Schemes fetched:', res);
        this.schemes = res.payLoad || []; 
      },
      error: (err) => console.error('Error loading schemes:', err)
    });
  }
}


  addToPortfolio() {
    if (this.selectedSchemeId && this.amount > 0) {
      const portfolioItem = {
        scheme_id: +this.selectedSchemeId,
        amount_invested: this.amount
      };

      this.fundService.addToPortfolio(portfolioItem).subscribe({
        next: (res) => {
          if (res.statusCode === 201) {
            console.log('Added to portfolio:', res.payLoad);
            this.loadPortfolio();
            this.amount = 0;
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
        if (res.statusCode === 200) {
          this.portfolio = res.payLoad;
        } else {
          console.error('Failed to fetch portfolio:', res.message);
        }
      },
      error: (err) => console.error('Error loading portfolio:', err)
    });
  }

  saveFundHouses() {
  this.fundService.saveFundHouses().subscribe({
    next: (res) => {
      if (res.statusCode === 201) {
        console.log(res.message);
        alert(res.message);
        this.loadFundHouses();  
      } else {
        console.error('Failed to save fund houses:', res.message);
        alert(res.message);
      }
    },
    error: (err: HttpErrorResponse) => {
  if (err.status === 400) {
    alert("API quota exceeded. Please try again later.");
  } else {
    alert("Error saving fund houses.");
  }
}
  });
}

saveSchemes() {
  this.fundService.saveSchemes().subscribe({
    next: (res) => {
      if (res.statusCode === 201) {
        console.log(res.message);
        alert(res.message);
      } else {
        console.error('Failed to save schemes:', res.message);
        alert(res.message);
      }
    },
    error: (err: HttpErrorResponse) => {
  if (err.status === 400) {
    alert("API quota exceeded. Please try again later.");
  } else {
    alert("Error saving fund houses.");
  }
}
  });
}


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
