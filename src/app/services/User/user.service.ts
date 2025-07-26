import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUserNameFromSessionStorage(): string {

    let user = sessionStorage.getItem("user");

    if(!user) return "";


    let { name } = JSON.parse(user);

    return name;
  }

  getEmailFromSessionStorage(): string {

    let user = sessionStorage.getItem("user");

    if(!user) return "";


    let { email } = JSON.parse(user);

    return email;
  }
}
