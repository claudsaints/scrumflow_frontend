import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class HttpModelService {
  protected serverUrl: string = "http://localhost:8080"

  constructor(protected http: HttpClient) {}

}
