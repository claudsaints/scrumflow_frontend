import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';


interface IAuth {
  token: string;
  user: {
    name: string;
    email: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private serverUrl: string = "http://localhost:8080"
  
  constructor(private http:HttpClient) {}

  signUp(name: string,email: string, password: string):Observable<any>{
    return this.http.post(`${this.serverUrl}/users`, { name, email, password, role: "ROLE_CUSTOMER" });
  }

  signIn(email: string, password: string):Observable<IAuth>{
      return this.http.post<IAuth>(`${this.serverUrl}/users/login`, {email, password})
      .pipe(tap( res => this.storageToken(res.token)))
  }

  storageToken(token: string){
    sessionStorage.setItem("token",token);
  }
    
}
