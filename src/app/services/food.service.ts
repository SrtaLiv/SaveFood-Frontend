import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food } from '../models/food';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl = 'http://localhost:8080/food';
  private apiAuth = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  getFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(this.apiUrl);
  }

  getFoodById(id: number): Observable<Food> {
    return this.http.get<Food>(`${this.apiUrl}/${id}`)
  }

  createFood(food:Food, image:File): Observable<Food> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    const formData = new FormData();
    formData.append('food', new Blob([JSON.stringify(food)], { type: 'application/json' }));
    formData.append('file', image);  //Debe llamarse el file igual q en el backend
    
    return this.http.post<Food>(this.apiUrl, formData, { headers });
  }

  // updateFood(food: Food) { //peticion de un objeto tipo food
  //   return this.http.put(this.apiUrl, food);
  // }

  updateFood(food: Food) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.put(this.apiUrl, food, { headers });
  }

  removeFood(id: number) { //peticion de un objeto tipo food
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateFoodImage(id: number, image: File): Observable<Food> { //formdata para enviar nuestra imagen al backend
    const formData = new FormData();
    formData.append('file', image);

    return this.http.put<Food>(`${this.apiUrl}/${id}/image`, formData)
  }

  signupUser(email: string, username: string, password: string): Observable<any> {
    const user = { email, username, password };
    return this.http.post(`${this.apiAuth}/signup`, user);  
  }

  loginUser(email: string, password: string): Observable<any> {
    const user = { email, password };
    return this.http.post(`${this.apiAuth}/login`, user);  
  }
}