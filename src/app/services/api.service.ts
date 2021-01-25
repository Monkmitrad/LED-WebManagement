import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL: string = '/api/';

  constructor(
    private http: HttpClient
  ) { }

  sendColor(r: number, g: number, b: number): void {
    this.http.post(this.baseURL + 'color', {r,g,b}).subscribe((response) => response);
  }

  getStatus() {
    return this.http.get(this.baseURL + 'status');
  }
}
