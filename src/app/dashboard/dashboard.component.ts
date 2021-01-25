import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  color (r: number, g: number, b: number): void {
    this.apiService.sendColor(r, g, b);
    // this.apiService.getStatus().subscribe((status) => console.log(status));
  }
}
