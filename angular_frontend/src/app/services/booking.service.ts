import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Booking, User} from "../shared/models/models";



@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private http: HttpClient,
  ) { }

  baseUrl = 'http://localhost:4200/api';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });

  getAllBookings() {
    return this.http.get<any>(`${this.baseUrl}/appointments`);
  }

  getBooking(bookingId: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.baseUrl}/appointments/s/${bookingId}`, { headers: this.headers });
  }


  saveBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.baseUrl}/appointments`, JSON.stringify(booking), { headers: this.headers } );
  }

  updateBooking(booking: Booking): Observable<Booking> {
    return this.http.put<Booking>(`${this.baseUrl}/appointments`,
      JSON.stringify(booking), {headers: this.headers});
  }

  deleteBooking() {

  }

  // users endpoints
  getUser(id: string): Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/customers/s/${id}`,
      { headers: this.headers });
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users?email=${email}`,
      { headers: this.headers });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/customers`,
      { headers: this.headers });
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/customers`, JSON.stringify(user), { headers: this.headers } );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/customers`,
      JSON.stringify(user), {headers: this.headers});
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/users/${id}`)
  }

  generateId(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  generateOTP(): number {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while(counter < 4) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return Number(result);
  }

}
