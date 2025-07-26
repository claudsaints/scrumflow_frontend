import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpModelService } from '../model/http-model.service';


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
export class AuthService extends HttpModelService {
  constructor(http: HttpClient){
    super(http);
  }

  signUp(name: string,email: string, password: string):Observable<any>{
    return this.http.post(`${this.serverUrl}/users`, { name, email, password, role: "ROLE_CUSTOMER" });
  }

  signIn(email: string, password: string):Observable<IAuth>{
      return this.http.post<IAuth>(`${this.serverUrl}/users/login`, {email, password})
      .pipe(tap( res =>{
        this.storageToken(res.token);
        this.storageUserData(res.user);
      }))
  }

  storageToken(token: string){
    sessionStorage.setItem("token",token);
  }

  storageUserData(user: {name: string, email: string}){
    sessionStorage.setItem("user", JSON.stringify(user));
  }
    
}
